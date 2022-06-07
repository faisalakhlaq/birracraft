from __future__ import absolute_import, unicode_literals

import os

from celery import Celery

import django

# set the default Django settings module for the 'celery' program.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'birracraft.settings')
django.setup()

app = Celery('birracraft')

# Using a string here means the worker will not have to
# pickle the object when using Windows.
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()
