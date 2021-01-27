from django.urls import path
from .views import ListUser, DetailUser

from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('users', ListUser.as_view(), name='user'),
    path('user/<int:pk>/', DetailUser.as_view(), name='user-details'),
]

urlpatterns = format_suffix_patterns(urlpatterns)
