from django.db import models

# Create your models here.

class Customer(models.Model):
    _type = [
        ('Particular','Particular'),
        ('Comerce','Comerce'),
    ]
    name = models.CharField(max_length=30)
    address = models.CharField(max_length=120)
    email = models.EmailField()
    cellphone = models.CharField(max_length=12)
    type = models.CharField(
        max_length=10, choices=_type, default='CO')

    def __str__(self):
        return '%s (%s)' % (self.name, self.type)


class Container(models.Model):
    _type = [
        ('Keg', 'Keg'),
        ('Growler', 'Growler'),
        ('Bottle', 'Bottle')
    ]
    _available_lts = {
        'Keg': [20, 30, 50],
        'Growler': [2],
        'Bottle': [0.5, 1, 2]
    }

    type = models.CharField(
        max_length=7, choices=_type, default='Keg')
    liters = models.DecimalField(max_digits=4, decimal_places=2)

    def select_lts(self):
        return self._available_lts[self.type]

    def __str__(self):
        return '%s - %s lt' % (self.type, self.liters)


class Flavour(models.Model):
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

    def __str__(self):
        return '%s' % (self.name)


class Product(models.Model):
    _state = [
        ('In Stock','In Stock'),
        ('In Transit','In Transit'),
        ('Empty','Empty'),
    ]
    code = models.CharField(
        max_length=5, help_text='Code graven in Kegs')
    container = models.ForeignKey(Container, on_delete=models.CASCADE)
    flavour = models.ForeignKey(Flavour, on_delete=models.CASCADE)
    arrived_date = models.DateTimeField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    state = models.CharField(
        max_length=10, choices=_state, default='ST')

    def __str__(self):
        return '%s - %s' % (self.container, self.flavour)


class Quota(models.Model):
    current_quota = models.IntegerField()
    total_quota = models.IntegerField()
    value = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField()

    def __str__(self):
        return '%s/%s' % (self.current_quota, self.total_quota)


class Payment(models.Model):
    _method = [
        ('Debit Card', 'Debit Card'),
        ('Credit Card', 'Credit Card'),
        ('Cash', 'Cash'),
        ('Bank Transfer', 'Bank Transfer'),
        ('Digital Wallet', 'Digital Wallet'),
        ('Cryptocurrency', 'Cryptocurrency'),
    ]
    transaction = models.IntegerField()
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    method = models.CharField(
        max_length=14, choices=_method, default='CA')
    quotas = models.ForeignKey(Quota, on_delete=models.CASCADE)

    def __str__(self):
        return self.transaction


class Order(models.Model):
    _state = [
        ('Pending', 'Pending'),
        ('In Quotas', 'In Quotas'),
        ('Paid', 'Paid'),
    ]
    date = models.DateField()
    products = models.ForeignKey(Product, on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    delivery_cost = models.DecimalField(max_digits=10, decimal_places=2)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    payment = models.OneToOneField(Payment, on_delete=models.CASCADE)
    state = models.CharField(
        max_length=9, choices=_state, default='GE')
    comment = models.TextField()

    def __str__(self):
        return '%s - %s' % (self.date, self.customer)