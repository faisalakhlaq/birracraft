from posixpath import split
from django.conf import settings
from django.core.mail import EmailMessage
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils import six
from birracraft.celery import app
from openpyxl import Workbook
from openpyxl.writer.excel import save_virtual_workbook
from datetime import datetime


def send_reset_pass_mail(request, user):
    msg=render_to_string('../templates/reset_pass_mail.html',{
        'username': user.username,
        'protocol': request.scheme,
        'domain': request.get_host(),
        'uid': urlsafe_base64_encode(force_bytes(user.pk)),
        'token': account_activation_token.make_token(user),
        })
    confirm_email = EmailMessage(
        subject='Password reset on Birracraft',
        body=msg,
        from_email=settings.DEFAULT_FROM_EMAIL,
        to=[request.data['email']],
    )
    confirm_email.content_subtype = 'html'
    confirm_email.send()


def send_verification_mail(request):
    user_email = request.data['email']
    msg=render_to_string('../templates/validate_user_mail.html',{
        'username': request.data['username'],
        'protocol': request.scheme,
        'domain': request.get_host(),
        'uid': urlsafe_base64_encode(force_bytes(user_email)),
        'token': account_activation_token.make_token(user_email),
        })
    confirm_email = EmailMessage(
        subject='Verificate your user account created on Birracraft',
        body=msg,
        from_email=settings.DEFAULT_FROM_EMAIL,
        to=[request.data['email']],
    )
    confirm_email.content_subtype = 'html'
    confirm_email.send()


class TokenGenerator(PasswordResetTokenGenerator):
    def _make_hash_value(self, user, timestamp):
        return (
            six.text_type(user) + six.text_type(timestamp)
        )

account_activation_token = TokenGenerator()


@app.task
def generate_report(data, orders):
    wb = Workbook()
    ws_orders = wb.active
    ws_orders.title = 'Orders'

    ws_orders.append([
        'Total_orders',
        len(orders)
    ])

    header = [
        'id',
        'date',
        'products',
        'price',
        'delivery_cost',
        'total_amount',
        'customer',
        'payment',
        'state',
        'comment',
    ]

    ws_orders.append(header)

    for order in orders:
        ws_orders.append(order)

    excel = save_virtual_workbook(wb)

    # Setting Email

    title = '[Birracraft] Report since {0} to {1}'.format(
                data['date_from'],
                datetime.today().strftime('%Y-%m-%d'))

    body = 'The results of your requested data since '
    body += '%s is attach on this email' % data['date_from']

    emails = EmailMessage(
        title,
        body,
        settings.DEFAULT_FROM_EMAIL,
        [data['email']]
    )
    emails.attach(
        'Birracraft_Report_.xlsx',
        excel,
        'application/vnd.openxmlformats-officedocument\
        .spreadsheetml.sheet'
    )
    emails.send()