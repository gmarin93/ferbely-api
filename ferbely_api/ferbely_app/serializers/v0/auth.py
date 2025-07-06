from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth.models import User


class EmailAuthTokenSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(style={'input_type': 'password'})

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        if email and password:
            # Try to authenticate with email as username
            user = authenticate(username=email, password=password)
            if user:
                attrs['user'] = user
                return attrs
            else:
                # Try to find user by email and authenticate
                try:
                    user_obj = User.objects.get(email=email)
                    user = authenticate(username=user_obj.username, password=password)
                    if user:
                        attrs['user'] = user
                        return attrs
                except User.DoesNotExist:
                    pass
                
                raise serializers.ValidationError('Invalid credentials')
        else:
            raise serializers.ValidationError('Must include email and password') 