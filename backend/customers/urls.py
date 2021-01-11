from django.urls import path
from .views import ReactView

urlpatterns = [
    path('api/', ReactView.as_view(), name="author")
]