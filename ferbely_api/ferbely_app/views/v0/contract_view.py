from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from ferbely_app.models import Contract
from ferbely_app.serializers.v0.contract_serializer import ContractSerializer, ContractCreateSerializer
from rest_framework.response import Response
from rest_framework.decorators import action

class ContractView(viewsets.ModelViewSet):
    queryset = Contract.objects.all()
    serializer_class = ContractSerializer
    serializer_class_create = ContractCreateSerializer
    permission_classes = [IsAuthenticated]
    
    @action(detail=False, methods=['get'])
    def get_all_contracts(self, request):
        contracts = Contract.objects.all()
        serializer = ContractSerializer(contracts, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def get_contract_by_id(self, request):
        contract_id = request.query_params.get('id')