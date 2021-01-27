from .models import UserAccount
from .serializers import UserCreateSerializer
from rest_framework import generics


class ListUser(generics.ListCreateAPIView):
    queryset = UserAccount.objects.all()
    serializer_class = UserCreateSerializer


class DetailUser(generics.RetrieveUpdateDestroyAPIView):
    queryset = UserAccount.objects.all()
    serializer_class = UserCreateSerializer
