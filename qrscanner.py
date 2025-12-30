from io import BytesIO
import os
from aiohttp import web
import aiohttp_cors
import qrcode

routes = web.RouteTableDef()

@routes.post("/QRGen")
async def generate_qr(request):
    data = await request.post()
    url = data["url"]
    
    qr = qrcode.make(url)
    
    # Convert to bytes
    buffer = BytesIO()
    qr.save(buffer, format='PNG')
    buffer.seek(0)
    
    return web.Response(body=buffer.read(), content_type='image/png')

if __name__ == "__main__":
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

    port = int(os.environ.get("PORT", 10000))
    web.run_app(app, host="0.0.0.0", port=port)