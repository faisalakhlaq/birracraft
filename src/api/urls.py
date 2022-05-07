from django.urls import path, include

from rest_framework.documentation import include_docs_urls
from rest_framework.permissions import AllowAny
from rest_framework.routers import SimpleRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from api import views

router = SimpleRouter()

router.register(r'user', views.UserViewSet, basename='user')
router.register(r'customer', views.CustomerViewSet, basename='customer')
router.register(r'container', views.ContainerViewSet, basename='container')
router.register(r'flavour', views.FlavourViewSet, basename='flavour')
router.register(r'quota', views.QuotaViewSet, basename='quota')
router.register(r'order', views.OrderViewSet, basename='order')

urlpatterns = [
    path('docs/', include_docs_urls(title='API Birracraft')),
    path('docs/', include_docs_urls(title='API Birracraft', permission_classes=[AllowAny,])),
    path('auth/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('reset/', views.reset),
    path('', include((router.urls, 'Birracraft'), namespace='Birracraft')),
]
