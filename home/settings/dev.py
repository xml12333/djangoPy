'''Use this for development'''

from .base import *

WSGI_APPLICATION = 'home.wsgi.dev.application'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}

CORS_ORIGIN_WHITELIST = (
    'http://localhost:3000',
)

STRIPE_PUBLISH_KEY = os.getenv('STRIPE_PUBLISH_KEY')
STRIPE_SECRET_KEY = os.getenv('STRIPE_SECRET_KEY')

