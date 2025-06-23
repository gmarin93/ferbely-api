from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, AllowAny
from ferbely_app.models import Task
from ferbely_app.serializers.v0.task_serializer import TaskSerializer, TaskCreateSerializer
from rest_framework.response import Response
from rest_framework.decorators import action

class TaskView(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    serializer_class_create = TaskCreateSerializer
    permission_classes = [AllowAny]  # Temporarily allow all for development
    
    @action(detail=False, methods=['get'])
    def get_all_tasks(self, request):
        tasks = Task.objects.all()
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def get_task_by_id(self, request):
        task_id = request.query_params.get('id')