from django.shortcuts import render
import razorpay
from django.views.decorators.csrf import csrf_exempt
from .forms import OrderForm
from .models import ReceiveOrder
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
import uuid

def home_view(request):
    context = {}
    form = OrderForm()
    context['form'] = form
    return render(request, "products/home.html", context)



class OrderCreate(APIView):
    permission_classes = ()
    authentication_classes = ()
    def post(self, request, *args, **kwargs):
        order_input = {
            'amount': int(request.data.get('amount', 1))*100,
            'currency': 'INR',
            'receipt': str(uuid.uuid1()),
            'notes': {'Shipping address': 'Bommanahalli, Bangalore'}
        }
        client = razorpay.Client(auth=('rzp_test_qcQMd5GfJhZAyQ', 'l3YVrS7Qv7YYO0JD4X0Qt5OC'))
        response = client.order.create(data = order_input)
        order = ReceiveOrder(name=request.data['name'], email=request.data['email'], amount=request.data['amount'], order_id=response['id'])
        order.save()
        return Response(response)



class OrderSave(APIView):
    permission_classes = ()
    authentication_classes = ()
    def post(self, request, *args, **kwargs):
        order = ReceiveOrder.objects.get(order_id=request.data['razorpay_order_id'])
        data = {
            'razorpay_order_id': order.order_id,
            'razorpay_payment_id': request.data.get('razorpay_payment_id'),
            'razorpay_signature': request.data.get('razorpay_signature'),
        }
        client = razorpay.Client(auth=('rzp_test_qcQMd5GfJhZAyQ', 'l3YVrS7Qv7YYO0JD4X0Qt5OC'))
        response = client.utility.verify_payment_signature(data)
        # print(response)
        if response == None:
            order.is_complete = True
            order.save()
            return Response({"payment": "success!"})
        else:
            return Response({"payment": "failure"})
