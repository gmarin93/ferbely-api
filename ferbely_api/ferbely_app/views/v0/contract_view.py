from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, AllowAny
from ferbely_app.models import Contract
from ferbely_app.serializers.v0.contract_serializer import ContractSerializer, ContractCreateSerializer

class ContractView(viewsets.ModelViewSet):
    queryset = Contract.objects.all()
    serializer_class = ContractSerializer
    permission_classes = [AllowAny]  # Temporarily allow all for development
    
    def get_serializer_class(self):
        if self.action == 'create':
            return ContractCreateSerializer
        return ContractSerializer