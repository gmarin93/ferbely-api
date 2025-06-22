from django.contrib import admin
from django.urls import path, include
from ferbely_app.routers import v0

urlpatterns = [
    path('v0/', include(v0.urls)), 
]
