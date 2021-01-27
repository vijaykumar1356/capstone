from rest_framework import serializers
from .models import (
                    Category,
                    Tag,
                    Product,
                    Wishlist,
                    Cart,
                    Orders,
                    OrderItem,
                    Rating
                    )


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = (
            'id',
            'name',
        )


class WishlistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wishlist
        fields = (
            'id',
            'user',
            'products',
        )


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = (
            'id',
            'name',
        )


class ProductSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=True)

    class Meta:
        model = Product
        fields = (
            'id',
            'title',
            'description',
            'price',
            'stock',
            'category',
            'image',
            'tags',
            'rating_list',
            )

    def to_representation(self, instance):
        """
        Represents category foreign key field by name
        """
        rep_category = super(
                        ProductSerializer,
                        self
                        ).to_representation(instance)
        rep_category['category'] = instance.category.name
        return rep_category


class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = (
            'id',
            'user',
            'products',
        )


class OrdersSerializer(serializers.ModelSerializer):
    # cartdata = serializers.ListField(child=serializers.DictField())
    class Meta:
        model = Orders
        fields = (
            'id',
            'user',
            'total',
            # 'products',
            # 'cartdata',
            'payment_id',
            'order_id',
            'signature',
            'date_ordered',
            'items',
        )


class OrdersItemSerializer(serializers.ModelSerializer):
    # cartdata = serializers.ListField(child=serializers.DictField())
    class Meta:
        fields = (
            'id',
            'order',
            'qty',
            'product',
        )
        model = OrderItem


class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = (
            'user',
            'product',
            'rating',
            'comment'
        )
