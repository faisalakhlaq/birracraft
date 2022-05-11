from django.contrib.auth.models import User
from django.utils.http import urlsafe_base64_decode
from django.utils.encoding import force_str
from django.shortcuts import redirect
from rest_framework import viewsets, permissions
from api.models import *
from api import serializers, utils


def activate_user(request, uidb64, token):
    site = request.scheme + request.get_host()
    try:
        uid = force_str(urlsafe_base64_decode(uidb64))
        user = User.objects.get(email=uid)
    except(TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None
    if user and utils.account_activation_token.check_token(user.email, token):
        user.is_active = True
        user.save(update_fields=['is_active'])
        site += '/ActivationSuccess'
    else:
        site += '/ActivationFail'
    return redirect(site)


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = serializers.UserSerializer

    def get_permissions(self):
        if self.action == 'create':
            return [permissions.AllowAny(), ]
        return super(UserViewSet, self).get_permissions()

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        if response.status_code == 201:
            utils.send_verification_mail(request)
        return response


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