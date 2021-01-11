from django.contrib import admin
from .models import Category, Product, Wishlist, Cart, CartProduct, Order, ReceiveOrder

class ProductAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', 'price', 'stock', 'category', 'image')

class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')

class WishlistAdmin(admin.ModelAdmin):
    list_display = ('id', 'user')

class CartAdmin(admin.ModelAdmin):
    list_display = ('id', 'customer', 'total', 'date_created')

class CartProductAdmin(admin.ModelAdmin):
    list_display = ('id', 'cart', 'product', 'quantity', 'amount')

class OrderAdmin(admin.ModelAdmin):
    list_display = ('cart', 'ordered_by', 'shipping_address', 'mobile', 'total', 'order_status', 'created_at')

class ReceiveOrderAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'amount', 'order_id', 'is_complete')

# class TagAdmin(admin.ModelAdmin):
#     list_display = ('id', 'name')

# class OrderAdmin(admin.ModelAdmin):
#     list_display = ('id', 'customer', 'is_complete', 'date_ordered', 'transaction_id')

# class OrderItemAdmin(admin.ModelAdmin):
#     list_display = ('id', 'product', 'quantity' , 'order' )

admin.site.register(Category, CategoryAdmin)
admin.site.register(Product, ProductAdmin)
admin.site.register(Wishlist, WishlistAdmin)
admin.site.register(Cart, CartAdmin)
admin.site.register(CartProduct, CartProductAdmin)
admin.site.register(Order, OrderAdmin)
admin.site.register(ReceiveOrder, ReceiveOrderAdmin)
# admin.site.register(Tag, TagAdmin)
# admin.site.register(Order, OrderAdmin)
# admin.site.register(OrderItem, OrderItemAdmin)