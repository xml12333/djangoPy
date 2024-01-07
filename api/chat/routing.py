from django.urls import path
from . import consumers

websocket_urlpatters = [
    path('wschat/', consumers.ChatConsumer.as_asgi())
]