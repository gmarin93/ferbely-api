from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated, AllowAny
from ferbely_app.models import Task
from ferbely_app.serializers.v0.task_serializer import TaskSerializer, TaskCreateSerializer
from rest_framework.response import Response
from rest_framework.decorators import action

class TaskView(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    serializer_class_create = TaskCreateSerializer
    permission_classes = [AllowAny]
    
    @action(detail=False, methods=['get'])
    def get_all_tasks(self, request):
        tasks = Task.objects.all().order_by('-created_at')
        print(tasks[0].contract)
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def get_task_by_id(self, request):
        task_id = request.query_params.get('id')
        task = Task.objects.get(id=task_id)
        serializer = TaskSerializer(task)
        return Response(serializer.data)
    
    @action(detail=False, methods=['delete'])
    def delete_task(self, request):
        task_id = request.query_params.get('id')
        task = Task.objects.get(id=task_id)
        task.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    @action(detail=False, methods=['post'])
    def create_task(self, request):
        serializer = TaskCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)