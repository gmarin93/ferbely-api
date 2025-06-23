from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, AllowAny
from ferbely_app.models import Bill
from ferbely_app.serializers.v0.bill_serializer import BillSerializer, BillCreateSerializer
from rest_framework.response import Response
from rest_framework.decorators import action

class BillView(viewsets.ModelViewSet):
    queryset = Bill.objects.all()
    serializer_class = BillSerializer
    serializer_class_create = BillCreateSerializer
    permission_classes = [AllowAny]  # Temporarily allow all for development
    
    @action(detail=False, methods=['get'])
    def get_all_bills(self, request):
        bills = Bill.objects.all()
        serializer = BillSerializer(bills, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def get_bill_by_id(self, request):
        bill_id = request.query_params.get('id')
        bill = Bill.objects.get(id=bill_id)
        serializer = BillSerializer(bill)
        return Response(serializer.data)
    
