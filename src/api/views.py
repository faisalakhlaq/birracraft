from django.contrib.auth.models import User

from rest_framework import viewsets, permissions

from requests import request

from api.models import *
from api import serializers

def reset(request):
    if request.method == 'GET':
        from django.core.mail import send_mail
        send_mail(
            'Subject',
            'Message',
            'mati@seni.com',
            ['allowed@receivers.com'],
            fail_silently=False
        )

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = serializers.UserSerializer

    def get_permissions(self):
        if self.action == 'create':
            return [permissions.AllowAny(), ]
        return super(UserViewSet, self).get_permissions()

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


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = serializers.OrderSerializer