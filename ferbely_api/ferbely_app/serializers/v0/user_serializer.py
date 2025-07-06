from ferbely_app.models import User
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id", "email", "role", "first_name", "last_name", 
            "phone", "address", "city", "state", "zip_code",
            "created_at", "updated_at",
        ]
        read_only_fields = ["id", "created_at", "updated_at"]

class UserCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "email", "password", "role", "first_name", "last_name",
            "phone", "address", "city", "state", "zip_code",
        ]
        extra_kwargs = {"password": {"write_only": True}}
        