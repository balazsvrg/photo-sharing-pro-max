# Dockerfile
FROM python:3.12

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /app

COPY requirements.txt .
RUN pip install --upgrade pip && pip install -r requirements.txt

COPY . .

RUN python manage.py makemigrations && python manage.py migrate


CMD ["gunicorn", "photo_sharing.wsgi:application", "--bind", "0.0.0.0:8000"]
