from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import React
from .serializers import ReactSerializer 
# Create your views here.

class ReactView(APIView):
    serializer_class = ReactSerializer
    def get(self, request):
        detail = [{"name": obj.name, "quote": obj.quote} for obj in React.objects.all()]
        return Response(detail)
    def post(self, request):
        serializer = ReactSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
