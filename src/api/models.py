from django.db import models

# Create your models here.

class Customers(models.Model):
    _type = [
        ('PA','Particular'),
        ('CO','Comerce'),
    ]
    name = models.CharField(max_length=30)
    address = models.CharField(max_length=120)
    email = models.EmailField()
    cellphone = models.CharField(max_length=12)
    type = models.CharField(
        max_length=2, choices=_type, default='CO')


class Containers(models.Model):
    _type = [
        ('K', 'Keg'),
        ('B', 'Bottle')
    ]
    _available_lts = {
        'Keg': [20, 30, 50],
        'Bottle': [0.5, 1, 2]
    }

    type = models.CharField(
        max_length=1, choices=_type, default='K')
    liters = models.IntegerField()

    def select_lts(self):
        return self._available_lts[self.type]

class Flavours(models.Model):
    # _flavour = [
    #     ('YAC','Yacare'),
    #     ('YAR','Yarara'),
    #     ('YAT','Yatay'),
    #     ('CAM','Camba'),
    #     ('GUA','Guarani'),
    #     ('PAR','Parana'),
    #     ('GOY','Goya'),
    # ]
    name = models.CharField(max_length=15)
    description = models.TextField()
    price_per_lt = models.DecimalField(max_digits=10, decimal_places=2)


class Products(models.Model):
    _state = [
        ('ST','In Stock'),
        ('TR','In Transit'),
        ('RE','Return & Empty'),
    ]
    code = models.CharField(max_length=5)
    containers = models.ForeignKey(Containers, on_delete=models.CASCADE)
    flavour = models.ForeignKey(Flavours, on_delete=models.CASCADE)
    arrived_date = models.DateTimeField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    state = models.CharField(
        max_length=2, choices=_state, default='ST')


class Quotas(models.Model):
    current_quota = models.IntegerField()
    total_quota = models.IntegerField()
    value = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField()


class Payments(models.Model):
    _method = [
        ('DC', 'Debit Card'),
        ('CC', 'Credit Card'),
        ('CA', 'Cash'),
        ('TR', 'Bank Transfer'),
        ('DW', 'Digital Wallet'),
        ('CR', 'Cryptocurrency'),
    ]
    transaction = models.IntegerField()
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    method = models.CharField(
        max_length=2, choices=_method, default='CA')
    quotas = models.ForeignKey(Quotas, on_delete=models.CASCADE)


class Orders(models.Model):
    _state = [
        ('PE', 'Pending'),
        ('QU', 'In Quotas'),
        ('PA', 'Paid'),
    ]
    date = models.DateField()
    products = models.ForeignKey(Products, on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    delivery_cost = models.DecimalField(max_digits=10, decimal_places=2)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    customer = models.ForeignKey(Customers, on_delete=models.CASCADE)
    payment = models.OneToOneField(Payments, on_delete=models.CASCADE)
    state = models.CharField(
        max_length=2, choices=_state, default='GE')
    comment = models.TextField()