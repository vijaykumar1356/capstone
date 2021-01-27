from django.contrib import admin
from .models import (
                    Category,
                    Product,
                    Wishlist,
                    Tag,
                    Orders,
                    OrderItem,
                    Rating
                    )


class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')


class TagAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')


class ProductAdmin(admin.ModelAdmin):
    list_display = (
        'title',
        'description',
        'price',
        'stock',
        'category',
        'image',
        'rating_list'
        )


class WishlistAdmin(admin.ModelAdmin):
    list_display = ('user',)


class OrderAdmin(admin.ModelAdmin):
    list_display = (
                    'id',
                    'user',
                    'total',
                    'payment_id',
                    'order_id',
                    'signature',
                    'date_ordered'
                    )


class OrderItemAdmin(admin.ModelAdmin):
    list_display = (
                    'order',
                    'qty',
                    'product'
                    )


class RatingAdmin(admin.ModelAdmin):
    list_display = ('user', 'product', 'rating', 'comment')


admin.site.register(Category, CategoryAdmin)
admin.site.register(Tag, TagAdmin)
admin.site.register(Product, ProductAdmin)
admin.site.register(Wishlist, WishlistAdmin)
admin.site.register(Orders, OrderAdmin)
admin.site.register(OrderItem, OrderItemAdmin)
admin.site.register(Rating, RatingAdmin)
