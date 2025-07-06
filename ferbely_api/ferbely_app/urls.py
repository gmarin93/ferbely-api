from django.contrib import admin
from django.urls import path, include
from ferbely_app.routers import v0
from ferbely_app.views.v0.auth import AuthTokenViewSet

urlpatterns = [
    path('v0/', include(v0.urls)), 
    path('v0/auth/login/', AuthTokenViewSet.as_view(), name='auth_login'),
]
