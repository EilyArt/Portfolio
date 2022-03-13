#!/bin/sh

if [ "$DATABASE" = "postgres" ]
then
    echo "Waiting for postgres..."

    while ! nc -z $SQL_HOST $SQL_PORT; do
      sleep 0.1
    done

    echo "PostgreSQL started"
fi

python manage.py flush --no-input
python manage.py migrate
python manage.py seed clients --number=1
python manage.py seed pages --number=1
python manage.py seed about --number=1
python manage.py seed projects --number=1
python manage.py seed posts --number=1
echo "from django.contrib.auth.models import User; User.objects.create_superuser('root', '', '0')" | python manage.py shell

exec "$@"