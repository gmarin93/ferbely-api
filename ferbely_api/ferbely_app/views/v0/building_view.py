from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, AllowAny
from ferbely_app.models.building import Building
from ferbely_app.serializers.v0.building_serializer import BuildingSerializer, BuildingCreateSerializer

class BuildingView(viewsets.ModelViewSet):
    queryset = Building.objects.all()
    serializer_class = BuildingSerializer
    permission_classes = [IsAuthenticated]
    
    def get_serializer_class(self):
        if self.action == 'create':
            return BuildingCreateSerializer
        return BuildingSerializer

    