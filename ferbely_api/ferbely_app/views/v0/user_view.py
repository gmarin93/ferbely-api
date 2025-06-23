from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, AllowAny
from ferbely_app.models import User
from ferbely_app.serializers.v0.user_serializer import UserSerializer, UserCreateSerializer

class UserView(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]  # Temporarily allow all for development
    
    def get_serializer_class(self):
        if self.action == 'create':
            return UserCreateSerializer
        return UserSerializer