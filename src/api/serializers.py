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

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        container_data = Container.objects.get(pk=representation['container'])
        representation['container'] = '%s - %s lt' \
            % (container_data.type, container_data.liters)
        representation['flavour'] = Flavour.objects.get(
            pk=representation['flavour']).name
        return representation

    class Meta:
        model = Product
        fields = ('pk', 'code', 'container', 'flavour',
                'arrived_date', 'price', 'state')


class OrderSerializer(serializers.ModelSerializer):

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['products'] = [
            p.code for p in Product.objects.filter(
                pk__in=representation['products']
            )
        ]
        representation['customer'] = Customer.objects.get(
            pk=representation['customer']).name
        return representation

    class Meta:
        model = Order
        fields = ('pk', 'date', 'products', 'price', 'delivery_cost',
                'total_amount', 'customer', 'state', 'comment')


class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ('pk', 'amount', 'method', 'order')


class QuotaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quota
        fields = ('pk', 'current_quota', 'total_quota',
                'value', 'date', 'payment')


class ReportSerializer(serializers.Serializer):
    date_from = serializers.DateField()