# pull official base image
FROM python:3.9.6-alpine

# set work directory
WORKDIR /app/api

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install psycopg2 dependencies
RUN apk update \
    && apk add postgresql-dev gcc python3-dev musl-dev jpeg-dev zlib-dev

# install dependencies
RUN pip install --upgrade pip
COPY ./requirements.txt .
RUN pip install -r requirements.txt

# copy entrypoint.sh
COPY ./entrypoint.sh .
RUN sed -i 's/\r$//g' /app/api/entrypoint.sh
RUN chmod +x /app/api/entrypoint.sh

# copy project
COPY . .

# run entrypoint.sh
ENTRYPOINT ["/app/api/entrypoint.sh"]