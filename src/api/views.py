from django.contrib.auth.models import User
from rest_framework import viewsets

from api.models import *
from api import serializers


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = serializers.UserSerializer


class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = serializers.CustomerSerializer


class ContainerViewSet(viewsets.ModelViewSet):
    queryset = Container.objects.all()
    serializer_class = serializers.ContainerSerializer


class FlavourViewSet(viewsets.ModelViewSet):
    queryset = Flavour.objects.all()
    serializer_class = serializers.FlavourSerializer


class QuotaViewSet(viewsets.ModelViewSet):
    queryset = Quota.objects.all()
    serializer_class = serializers.QuotaSerializer