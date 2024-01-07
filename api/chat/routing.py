from django.urls import path
from . import consumers

websocket_urlpatters = [
    path('ws/chat/', consumers.ChatConsumer.as_asgi())
]