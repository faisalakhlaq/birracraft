from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework import serializers
from api.models import *


class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField()
    is_active = serializers.BooleanField(
        required=False,
        default=False
    )

    def validate_email(self, value):
        if User.objects.filter(email__exact=value).exists():
            raise serializers.ValidationError("Duplicate")
        return value

    def create(self, validate_data):
        validate_data['password'] = make_password(validate_data['password'])
        return super(UserSerializer, self).create(validate_data)

    class Meta:
        model = User
        fields = ('pk', 'username', 'password', 'first_name', 'last_name',
                    'email', 'is_staff', 'is_active')


class UserResetPassSerializer(serializers.Serializer):
    email = serializers.EmailField()


class UserNewPassSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ('pk', 'name', 'address', 'email', 'cellphone', 'type')


class ContainerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Container
        fields = ('pk', 'type', 'liters')


class FlavourSerializer(serializers.ModelSerializer):
    class Meta:
        model = Flavour
        fields = ('pk', 'name', 'description', 'price_per_lt')


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('pk', 'code', 'container', 'flavour',
                'arrived_date', 'price', 'state')


class QuotaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quota
        fields = ('pk', 'current_quota', 'total_quota', 'value', 'date')


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ('pk', 'date', 'products', 'price', 'delivery_cost',
                'total_amount', 'customer', 'payment', 'state', 'comment')