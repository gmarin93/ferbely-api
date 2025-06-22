from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from ferbely_app.models.building import Building
from ferbely_app.serializers.v0.building_serializer import BuildingSerializer, BuildingCreateSerializer
from rest_framework.response import Response
from rest_framework.decorators import action

class BuildingView(viewsets.ModelViewSet):
    queryset = Building.objects.all()
    serializer_class = BuildingSerializer
    serializer_class_create = BuildingCreateSerializer
    permission_classes = [IsAuthenticated]  
    
    @action(detail=False, methods=['get'])
    def get_all_buildings(self, request):
        buildings = Building.objects.all()
        serializer = BuildingSerializer(buildings, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])  
    def get_building_by_id(self, request):
        building_id = request.query_params.get('id')
        building = Building.objects.get(id=building_id)
        serializer = BuildingSerializer(building)
        return Response(serializer.data)
    