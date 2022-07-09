from django.contrib import admin
from api.models import *

# Register your models here.

@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_filters = ('type')
    list_display = ('name', 'address', 'email', 'cellphone', 'type')
    search_field = ('name', 'email', 'cellphone')


@admin.register(Container)
class ContainerAdmin(admin.ModelAdmin):
    list_filters = ('type', 'liters')
    list_display = ('type', 'liters')


@admin.register(Flavour)
class FlavourAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'price_per_lt')


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_filters = ('state')
    list_display = ('code', 'arrived_date', 'price', 'state')
    search_field = (
        'code', 'container__type', 'container__liters', 'flavour__name'
        )


@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_filters = ('method')
    list_display = ('transaction', 'amount', 'method')
    search_field = ('transaccton', 'amount')


@admin.register(Quota)
class QuotaAdmin(admin.ModelAdmin):
    list_display = ('current_quota', 'total_quota', 'value', 'date')


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_filters = ('state')
    list_display = (
        'date', 'price', 'delivery_cost', 'total_amount', 'customer', 'state'
        )
    search_field = ('customer__name')
