from rest_framework import serializers
from .models import Photo
from django.contrib.auth.models import User

class PhotoSerializer(serializers.ModelSerializer):
    owner = serializers.CharField(source='owner.username', read_only=True)

    class Meta:
        model = Photo
        fields = ['id', 'title', 'image', 'upload_date', 'owner']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']
