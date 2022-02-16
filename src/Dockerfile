# =============
# BUILDER IMAGE
# =============

FROM python:3.8.11-alpine3.14 as builder

ENV PYTHONDONTWRITEBYTECODE 1

ENV PYTHONUNBUFFERED 1

COPY . /usr/src/birracraft

WORKDIR /usr/src/birracraft

RUN apk update \
    && apk add libxml2-dev libxslt-dev libffi-dev gcc musl-dev \
    && apk add libgcc openssl-dev curl jpeg-dev zlib-dev freetype-dev \
    && apk add lcms2-dev openjpeg-dev tiff-dev tk-dev tcl-dev \
    && apk add python3-dev mariadb-dev

RUN pip3 install -U pip && \
    pip3 install --no-cache-dir -r requirements.txt
