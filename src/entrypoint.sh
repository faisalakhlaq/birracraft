#/bin/sh

python manage.py collectstatic --no-input

gunicorn birracraft.wsgi:application --bind 0.0.0.0:8000
