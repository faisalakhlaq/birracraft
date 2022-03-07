# Birracraft
> powered by Docker

### Description

Web application to manage the distribution of craft beer liters suplied to clients.
The project consists in a backend develop with _Django_ and a front-end in _ReactJS_. To serve this applications, a _PostgreSQL_ database & _NGINX_ service are used.
All of this is implemented through _Docker_ containers.

### Deploy

To run the project just use the docker-compose file.
`$ docker-compose up --build -d`

_docker-compose.override.yml_ is used to development phase.