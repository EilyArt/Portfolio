* Execute Commands Sample$ docker-compose -f docker-compose.prod.yml exec web python manage.py migrate --noinput
* Create New Admin$ docker-compose -f docker-compose.prod.yml exec web python manage.py createsuperuser
* Create New App$ django-admin startapp app-name
* Migrations $ docker-compose -f docker-compose.prod.yml exec web python manage.py makemigrations
* Migrations $ docker-compose -f docker-compose.prod.yml exec web python manage.py migrate
* Seed Data $ docker-compose -f docker-compose.prod.yml exec web python3 manage.py seed APP-NAME --number=200
* docker command for production $ sudo docker-compose -f docker-compose.prod.yml up
* docker command for getting backup $ docker-compose -f docker-compose.prod.yml exec web python3 manage.py archive
