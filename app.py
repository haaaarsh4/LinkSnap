from aiohttp import web, ClientSession
import aiohttp_cors
import sqlite3
import validators
import string
import random

routes = web.RouteTableDef()

# Validating if the inputted URL is in the correct format
async def validate_long_url_format(longurl: str):
    response = validators.url(longurl)
    return response

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
        except Exception as ex:
            print(ex)
        return web.Response(text=code)
    return web.Response(status=400, text="Invalid URL")

@routes.get("/{code}")
async def redirect_to_logurl(request):
    code = request.match_info["code"]
    row = cursor.execute("SELECT longurl FROM URLSHORTNER WHERE CODE = ?", (code,)).fetchone()
    if not row:
        return web.Response(status=404, text="URL not found")
    return web.HTTPFound(row[0])

if __name__ == "__main__":
    connection = sqlite3.connect("urlshorten.db")
    cursor = connection.cursor()
    cursor.execute("CREATE TABLE IF NOT EXISTS URLSHORTNER(longurl TEXT NOT NULL, code TEXT UNIQUE NOT NULL)")

    app = web.Application()
    
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

    print("Starting server on http://0.0.0.0:8000")
    web.run_app(app, host="0.0.0.0", port=8000)
    # web.run_app(app,host="127.0.0.1",port=8000)


