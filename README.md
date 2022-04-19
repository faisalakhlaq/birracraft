# Birracraft
> powered by Docker

### Description

Web application to manage the distribution of craft beer liters suplied to clients.
The project consists in a backend develop with _Django_ and a front-end in _ReactJS_. To serve this applications, a _PostgreSQL_ database & _NGINX_ service are used.
All of this is implemented through _Docker_ containers.

### Deploy

To run the project just use the docker-compose file.
`$ docker-compose up --build -d`

> _Portainer_: The admin's credentials would be pre-set with the portainer_pass plaintext file

_docker-compose.override.yml_ is used to development phase.

* Keep in mind that for you to run the _override_ with the _volume_ for
the _web_ service it's necessary to config the _sysctl_ in the docker host.  
If you don't change it, the number of files monitored by the system would reach
its limit and this will raise an error.
* You can resolve it with the following commands:
    - `# echo "fs.inotify.max_user_watches=524288" >> /etc/sysctl.conf`
    - `# sysctl -p`  
    - Generally, in gnu/linux hosts, the default max watches is 8196. To see the current number run:  
    `$ cat /proc/sys/fs/inotify/max_user_watches`
