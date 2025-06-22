from ferbely_app.models import Contract
from rest_framework import serializers

class ContractSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contract
        fields = ["id", "name", "type", "start_date", "end_date", "price", "status", "created_at", "updated_at"]
        read_only_fields = ["id", "created_at", "updated_at"]

class ContractCreateSerializer(serializers.ModelSerializer):    
    class Meta:
        model = Contract
        fields = ["name", "type", "start_date", "end_date", "price", "status"] 