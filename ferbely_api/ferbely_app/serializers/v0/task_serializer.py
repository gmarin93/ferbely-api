from ferbely_app.models import Task
from rest_framework import serializers

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ["id", "name", "type", "status", "created_at", "updated_at"]
        read_only_fields = ["id", "created_at", "updated_at"]

class TaskCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ["name", "type", "status"]