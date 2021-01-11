from django.db import models
from customers.models import User
from django.conf import settings
from django.core.files.storage import FileSystemStorage
import random
import os
import decimal

# one to many relationship with products
class Category(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.name}"


# upload product images
def custom_path(instance, filename):
    base_name = os.path.basename(filename)
    name, ext = os.path.splitext(base_name)
    final_filename = f"{name}{random.randint(1, 999999999)}{ext}"
    return f"products/{final_filename}"

class Product(models.Model):
    title = models.CharField(max_length=50, null=False, blank=False)
    description = models.TextField()
    price = models.DecimalField(max_digits=20, decimal_places=2)
    stock = models.IntegerField()
    category = models.ForeignKey(to=Category, on_delete=models.CASCADE, blank=True )
    image = models.ImageField(upload_to=custom_path, blank=True, default="defualt.png")
    # tags = models.ManyToManyField(Tag, blank=True)
    

    def __str__(self):
        return f"{self.title} : {self.price}"


class Wishlist(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    products = models.ManyToManyField(Product, blank=True)

    def __str__(self):
        return f"{self.user.username} : {self.products.all()}"



class Cart(models.Model):
    customer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True)
    # total = models.PositiveIntegerField(default=0)
    date_created = models.DateTimeField(auto_now_add=True)

    @property
    def total(self):
        objs = self.items.all()
        if objs is None:
            return decimal.Decimal('0.00')
        else:
            total = decimal.Decimal('0.00')
            for obj in objs:
                total += obj.amount
            return total


    def __str__(self):
        return f"Cart {self.id} : {self.customer}"

class CartProduct(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)

    @property
    def amount(self):
        return self.product.price*self.quantity

    def __str__(self):
        return f"Card : {self.cart.id} - {self.product} : {self.amount}"

ORDER_STATUS = (
    ("Order Received", "Order Received"),
    ("Order Processing", "Order Processing"),
    ("On the way", "On the way"),
    ("Order Completed", "Order Completed"),
    ("Order Cancelled", "Order Cancelled")
)

class Order(models.Model):
    cart = models.OneToOneField(Cart, on_delete=models.CASCADE)
    # ordered_by = models.CharField(max_length=200)
    shipping_address = models.CharField(max_length=200)
    mobile = models.CharField(max_length=10)
    # total = models.PositiveIntegerField()
    order_status = models.CharField(max_length=50, choices=ORDER_STATUS)
    created_at = models.DateTimeField(auto_now_add=True)

    @property
    def total(self):
        return self.cart.total

    @property
    def ordered_by(self):
        return self.cart.customer

    def __str__(self):
        return f"Order: {self.id} - {self.order_status}"


class ReceiveOrder(models.Model):
    name = models.CharField(max_length=50)
    email = models.EmailField()
    amount = models.PositiveIntegerField()
    order_id = models.CharField(max_length=100)
    is_complete = models.BooleanField(default=False)
    def __str__(self):
        return f"Received Order: {self.name} - {self.order_id}"
# many to many relationship with products
# class Tag(models.Model):
#     name = models.CharField(max_length=30)
    
#     def __str__(self):
#         return f"{self.name}"


# class Order(models.Model):
#     customer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)
#     is_complete = models.BooleanField(default=False)
#     date_ordered = models.DateTimeField(auto_now=True)
    

#     @property
#     def transaction_id(self):
#         return random.randint(1, 99999999)

#     def __str__(self):
#         return f"{self.customer}: {self.transaction_id}"
    

# class OrderItem(models.Model):
#     product = models.ForeignKey(Product, on_delete=models.SET_NULL, blank=True, null=True)
#     order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True, blank=True, related_name='orderitesms')
#     quantity = models.IntegerField(default=1)

#     def __str__(self):
#         return f"{self.product}: {self.quantity}"
