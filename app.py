from aiohttp import web, ClientSession
import aiohttp_cors
from aiohttp_middlewares import rate_limit_middleware
import sqlite3
import validators
import string
import random
import os
from urllib.parse import urlparse
import aioredis

routes = web.RouteTableDef()

MAX_URL_LENGTH = 2048

# Validating if the inputted URL is in the correct format
async def validate_long_url_format(longurl: str):
    if len(longurl) > MAX_URL_LENGTH:
        return False
    
    response = validators.url(longurl)
    if not response:
        return False
    
    # Sanitize input
    parsed = urlparse(longurl)
    if parsed.scheme not in ['http', 'https']:
        return False
    
    return True

# Validate that the input URL is a valid web address
async def validate_url(longurl: str):
    try:
        async with ClientSession() as session:
            async with session.get(longurl, timeout=5, allow_redirects=True) as resp:
                if resp.status in [200,301,302,403]:
                    return True
                return False
    except Exception as ex:
        return False

def generate_code(size=6):    
    chars = string.ascii_uppercase + string.digits
    code = "".join(random.choice(chars) for _ in range(size))
    return code

@routes.post("/shorten")
async def shorten(request):
    data = await request.post()
    longurl = data["url"]
    if await validate_long_url_format(longurl) and await validate_url(longurl):
        code = generate_code()
        try:
            cursor.execute(f"INSERT INTO URLSHORTNER (longurl, code) VALUES (?, ?)", (longurl, code,))
            connection.commit()
            
            redis = request.app['redis']
            await redis.setex(f"url:{code}", 3600, longurl)
            
        except Exception as ex:
            print(ex)
        return web.Response(text=code)
    return web.Response(status=400, text="Invalid URL")

@routes.get("/{code}")
async def redirect_to_logurl(request):
    code = request.match_info["code"]
    
    redis = request.app['redis']
    cached = await redis.get(f"url:{code}")
    if cached:
        return web.HTTPFound(cached.decode())
    
    row = cursor.execute("SELECT longurl FROM URLSHORTNER WHERE CODE = ?", (code,)).fetchone()
    if not row:
        return web.Response(status=404, text="URL not found")
    
    await redis.setex(f"url:{code}", 3600, row[0])
    
    return web.HTTPFound(row[0])

if __name__ == "__main__":
    connection = sqlite3.connect("urlshorten.db")
    cursor = connection.cursor()
    cursor.execute("CREATE TABLE IF NOT EXISTS URLSHORTNER(longurl TEXT NOT NULL, code TEXT UNIQUE NOT NULL)")

    app = web.Application()
    
    app.middlewares.append(rate_limit_middleware(
        rate=10,  # 10 requests
        per=60    # per 60 seconds
    ))
    
    cors = aiohttp_cors.setup(app, defaults={
        "*": aiohttp_cors.ResourceOptions(
            allow_credentials=True,
            expose_headers="*",
            allow_headers="*",
            allow_methods="*"
        )
    })
    
    app.add_routes(routes)
    
    for route in list(app.router.routes()):
        cors.add(route)

    async def init_redis(app):
        app['redis'] = await aioredis.create_redis_pool('redis://localhost')
    
    async def close_redis(app):
        app['redis'].close()
        await app['redis'].wait_closed()
    
    app.on_startup.append(init_redis)
    app.on_cleanup.append(close_redis)

    port = int(os.environ.get("PORT", 10000))
    web.run_app(app, host="0.0.0.0", port=port)