#!/bin/sh

if [ "$DATABASE" = "postgres" ]
then
    echo "Waiting for postgres..."

    while ! nc -z $SQL_HOST $SQL_PORT; do
      sleep 0.1
    done

    echo "PostgreSQL started"
fi

python manage.py makemigrations 
python manage.py migrate
echo "from django.contrib.auth.models import User; User.objects.create_superuser('root', '', '0')" | python manage.py shell

exec "$@"