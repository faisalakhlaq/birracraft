from django.conf import settings
from django.core.mail import EmailMessage
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils import six


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
