from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework import status
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from ferbely_app.serializers.v0.auth import EmailAuthTokenSerializer


class AuthTokenViewSet(ObtainAuthToken):
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    serializer_class = EmailAuthTokenSerializer
    
    def get(self, request, *args, **kwargs):
        """
        Show the login form in the browser
        """
        return Response({
            'message': 'Please provide email and password to get your authentication token',
            'method': 'POST',
            'fields': {
                'email': 'Your email address',
                'password': 'Your password'
            }
        })

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'email': user.email,
            'username': user.username,
            'first_name': user.first_name,
            'last_name': user.last_name,
        }, status=status.HTTP_200_OK)

