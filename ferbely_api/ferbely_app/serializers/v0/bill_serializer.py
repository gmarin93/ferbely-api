from ferbely_app.models import Bill
from rest_framework import serializers

class BillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bill
        fields = ["id", "name", "created_at", "updated_at"]
        read_only_fields = ["id", "created_at", "updated_at"]

class BillCreateSerializer(serializers.ModelSerializer):    
    class Meta:
        model = Bill
        fields = ["name"]