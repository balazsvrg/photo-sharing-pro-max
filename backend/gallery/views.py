from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status
from .models import Photo
from .serializers import PhotoSerializer, UserSerializer
from django.contrib.auth.models import User
from django.contrib.auth import login, authenticate, logout
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404


@api_view(['POST'])
@permission_classes([AllowAny])
def register_view(request):
    username = request.data.get('username')
    password = request.data.get('password')
    try:
        if username and password:
            user = User.objects.create_user(username=username, password=password)
            token, _ = Token.objects.get_or_create(user=user)
            return Response({'token': token.key}, status=201)
        return Response({'error': 'Invalid data'}, status=400)
    except Exception as e:
        return Response({'error': str(e)}, status=500)

@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(username=username, password=password)
    if user:
        token, _ = Token.objects.get_or_create(user=user)
        return Response({'token': token.key, 'username': user.username}, status=200)
    return Response({'error': 'Invalid credentials'}, status=400)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_view(request):
    # Delete the token to force re-login
    request.user.auth_token.delete()
    return Response({"message": "Logged out successfully"}, status=200)

@api_view(['GET', 'POST'])
def photo_list_create(request):
    if request.method == 'GET':
        # Anyone can view photos
        photos = Photo.objects.all().order_by('upload_date')
        serializer = PhotoSerializer(photos, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        # Require authentication for uploading
        if not request.user.is_authenticated:
            return Response({'detail': 'Authentication credentials were not provided.'}, status=401)

        serializer = PhotoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(owner=request.user)
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


@api_view(['GET', 'DELETE'])
@permission_classes([IsAuthenticated])
def photo_detail_delete(request, photo_id):
    photo = get_object_or_404(Photo, id=photo_id)
    if request.method == 'GET':
        serializer = PhotoSerializer(photo)
        return Response(serializer.data)
    elif request.method == 'DELETE':
        if photo.owner != request.user:
            return Response({'error': 'Not authorized'}, status=403)
        photo.delete()
        return Response(status=204)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])  # Optional: you can make this AllowAny if needed
def user_detail_view(request, user_id):
    user = get_object_or_404(User, id=user_id)
    serializer = UserSerializer(user)
    return Response(serializer.data, status=200)

