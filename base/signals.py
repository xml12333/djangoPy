from django.db.models.signals import pre_save
from django.contrib.auth.models import User
import os
from dotenv import load_dotenv
load_dotenv()

def updateUser(sender, instance, **kwargs):
    user = instance
    if user.email != '':
        user.username = user.email

if os.getenv('ENABLE_SIGNALS'):
    pre_save.connect(updateUser,sender=User)