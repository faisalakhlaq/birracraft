# Birracraft
> powered by Docker

### Description

Django project started from scratch without installed dependecies in host, only using **docker** client.

### Guide

1. Establish projet structured implemented via folder hierarchy.
2. In *./src*
    - Create `requeriments.txt` with Django as only dependency.
    - Create the `Dockerfile` and add the step for install requeriments.
3. In this case, went to the root and created the docker-compose.yml
    - Other way its just using `docker run`
4. Write the service that give birth to the project.
    - Very important that its specified the volume where your code its gonna be created in your host.
5. Execute
    `$ docker-compose up --build -d`
6. Work in the container:
    `$ docker exec -it "container-name" sh`
    - Run the [django commands](https://docs.djangoproject.com/en/4.0/intro/tutorial01/)  
        `# django-admin startproject "project-name"`  
        `# python manage.py startapp "app-name"`  
7. Now the basic structure its done.
