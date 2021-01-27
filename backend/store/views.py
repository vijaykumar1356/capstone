import uuid
import razorpay
import json
from rest_framework import status
from .models import (
                    Product,
                    Category,
                    Wishlist,
                    Tag,
                    Cart,
                    Orders,
                    OrderItem,
                    )
from .serializers import (
                    ProductSerializer,
                    CategorySerializer,
                    WishlistSerializer,
                    TagSerializer,
                    CartSerializer,
                    OrdersSerializer,
                    OrdersItemSerializer,
                    RatingSerializer
                    )
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.reverse import reverse


class ListProduct(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class DetailProduct(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class ListCategory(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class DetailCategory(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class ListWishlist(generics.ListCreateAPIView):
    queryset = Wishlist.objects.all()
    serializer_class = WishlistSerializer


class DetailWishlist(generics.RetrieveUpdateDestroyAPIView):
    queryset = Wishlist.objects.all()
    serializer_class = WishlistSerializer


class ListTag(generics.ListCreateAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer


class DetailTag(generics.RetrieveUpdateDestroyAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer


class ListCart(generics.ListCreateAPIView):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer


class DetailCart(generics.RetrieveUpdateDestroyAPIView):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer


class ListOrders(generics.ListCreateAPIView):
    queryset = Orders.objects.all()
    serializer_class = OrdersSerializer


class DetailOrders(generics.RetrieveUpdateDestroyAPIView):
    queryset = Orders.objects.all()
    serializer_class = OrdersSerializer


class Order_details(APIView):
    def get(self, request, format=None):
        if request.query_params:
            u = request.query_params.get('user_key')
            orders = Orders.objects.filter(user=u)
            serializer = OrdersSerializer(orders, many=True)
            return Response(serializer.data)
        orders = Orders.objects.all()
        serializer = OrdersSerializer(orders, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        data = json.loads(request.body)
        # print(data)
        # return Response({"ok":"not okey"})
        orders = OrdersSerializer(data=data)
        # print("ok")
        if orders.is_valid():
            orders.save()
            return Response(orders.data)
        return Response({"ok": "bad"})


class OrderTest(APIView):
    def post(self, request, format=None):
        data = json.loads(request.body)
        total = int(data["Total"])*100
        client = razorpay.Client(
            auth=("rzp_test_qcQMd5GfJhZAyQ", "l3YVrS7Qv7YYO0JD4X0Qt5OC")
            )
        response = client.order.create(data={
            "amount": total,
            "currency": "INR",
            "receipt": str(uuid.uuid1()),
            "payment_capture": 1
            })
        return Response(response)


class OrderItemDetail(APIView):
    def get(self, request, format=None):
        orders = OrderItem.objects.all()
        serializer = OrdersItemSerializer(orders, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        data = json.loads(request.body)
        print(data)
        ordersitem = OrdersItemSerializer(data=data)
        if ordersitem.is_valid():
            ordersitem.save()
            print("okoksrk")
            return Response({"empty"})
        return Response({"ok": "bad"}, status=status.HTTP_400_BAD_REQUEST)


# @api_view(['POST'])
# def OrderItemDetail(request, format=None):
#     if request.method == 'POST':
#         data = json.loads(request.body)
#         # dk=request.POST["orders"]
#         ord_id=data["orders"]
#         # print(ord_id)
#         # print(request.data["orders"])
#         # orders = request.data["orders"]
#         ord_qty = data["qty"]
#         print(ord_qty)
#         ord_product =data["products"]
#         # userId = int(request.data['userId'])
#         # productId = int(request.data['productId'])
#         # a = User.objects.filter(id=userId).first()
#         # b = Product.objects.filter(id=productId).first()
#         OrderItem.objects.create(
#                   orders=ord_id, qty=ord_qty, products=ord_product
#                   )
#         return Response(status=status.HTTP_201_CREATED)
class RatingView(APIView):
    def post(self, request, format=None, *args, **kwargs):
        data = json.loads(request.body)
        print(data)
        serializer = RatingSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                        {"status": "success"},
                        status=status.HTTP_201_CREATED
                        )
        return Response(
                    {"status": "failure"},
                    status=status.HTTP_400_BAD_REQUEST
                    )


class ApiRoot(APIView):
    def get(self, request, format=None):
        return Response({
            'products': reverse('products', request=request, format=format),
            'category': reverse('category', request=request, format=format),
            'wishlist': reverse('wishlist', request=request, format=format),
            'tag': reverse('tag', request=request, format=format),
            'order': reverse('order', request=request, format=format),
            'cart': reverse('cart', request=request, format=format),
            'orderitemdetail': reverse(
                                'orderitemdetail',
                                request=request,
                                format=format
                                ),
            'rating': reverse('rating', request=request, format=format),
            'orderdetail': reverse(
                'orderdetail',
                request=request,
                format=format
                ),
        })
