from django.urls import path
from .views import home_view, OrderCreate, OrderSave
urlpatterns = [
    path('', home_view, name="home"),
    path('order/', OrderCreate.as_view(), name='order'),
    path('save/', OrderSave.as_view(), name='save')
]