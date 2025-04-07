# usuarios/models.py

from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    is_chef = models.BooleanField(default=False)
    is_manutentor = models.BooleanField(default=False)
    is_administrador = models.BooleanField(default=False)
