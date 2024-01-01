from django.urls import path
from . import consumers

websocket_urlpatters = [
    path('chat/', consumers.ChatConsumer.as_asgi())
]