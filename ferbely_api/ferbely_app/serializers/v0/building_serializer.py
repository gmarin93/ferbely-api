from ferbely_app.models import Building
from rest_framework import serializers

class BuildingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Building
        fields = ["id", "name", "role", "address", "created_at", "updated_at"]
        read_only_fields = ["id", "created_at", "updated_at"]

class BuildingCreateSerializer(serializers.ModelSerializer):    
    class Meta:
        model = Building
        fields = ["name", "role", "address"]