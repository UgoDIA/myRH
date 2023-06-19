from django.shortcuts import render
from rest_framework import viewsets
from .serializers import EmpSerializer
from .models import Emp
# Create your views here.

class EmpViewsets(viewsets.ModelViewSet):
    serializer_class=EmpSerializer
    queryset = Emp.objects.all()