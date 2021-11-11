* Execute Commands Sample$ docker-compose -f docker-compose.prod.yml exec web python manage.py migrate --noinput

* Create New Admin$ docker-compose -f docker-compose.prod.yml exec web python manage.py createsuperuser 

* Create New App$ django-admin startapp app-name