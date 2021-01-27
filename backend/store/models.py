from django.db import models
from django.conf import settings


class Category(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.name}"


class Tag(models.Model):
    name = models.CharField(max_length=30)

    def __str__(self):
        return f"{self.name}"


class Product(models.Model):
    title = models.CharField(max_length=50, null=False, blank=False)
    description = models.TextField()
    price = models.DecimalField(max_digits=20, decimal_places=2)
    stock = models.IntegerField()
    category = models.ForeignKey(
                        to=Category,
                        on_delete=models.CASCADE,
                        blank=True
                        )
    image = models.ImageField()
    tags = models.ManyToManyField(Tag, blank=True)

    @property
    def rating_list(self):
        rating_list = []
        objs = self.ratings.all()
        for obj in objs:
            rating_list.append({
                'user': obj.user.username,
                'rating': obj.rating,
                'comment': obj.comment
            })
        return rating_list

    def __str__(self):
        return f"{self.title} : {self.description}"


class Wishlist(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
        )
    products = models.ManyToManyField(Product, blank=True)

    def __str__(self):
        return f"{self.user.username} : {self.products.all()}"


class Cart(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
        )
    products = models.ManyToManyField(Product, blank=True)

    def __str__(self):
        return f"{self.user.username} : {self.products.all()}"


class Orders(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="orders")
    total = models.FloatField()
    payment_id = models.CharField(max_length=50)
    order_id = models.CharField(max_length=50, unique=True)
    signature = models.CharField(max_length=250)
    date_ordered = models.DateTimeField(auto_now_add=True)

    @property
    def items(self):
        item_list = []
        objs = self.order_items.all()
        for obj in objs:
            item_list.append({
               "item": obj.product.title,               
               "id":obj.product.id,
               "price":obj.product.price,
               "image":str(obj.product.image),
               "quantity": obj.qty,
            })
        return item_list

    def __str__(self):
        return f"{self.order_id}"


class OrderItem(models.Model):
    order = models.ForeignKey(
                        Orders,
                        on_delete=models.CASCADE,
                        related_name="order_items"
                        )
    qty = models.IntegerField()
    product = models.ForeignKey(
                        to=Product,
                        on_delete=models.CASCADE,
                        blank=True
                        )


RATING = (
    (1, 1),
    (2, 2),
    (3, 3),
    (4, 4),
    (5, 5),
        )


class Rating(models.Model):
    user = models.ForeignKey(
                        settings.AUTH_USER_MODEL,
                        on_delete=models.CASCADE
                        )
    product = models.ForeignKey(
                            Product,
                            on_delete=models.CASCADE,
                            related_name='ratings'
                            )
    rating = models.PositiveIntegerField(choices=RATING, default=0)
    comment = models.CharField(max_length=300, default="")

    def _str_(self):
        return f"{self.product} - {self.rating}"
