from django.urls import path
from .views import (
                ApiRoot,
                ListProduct,
                DetailProduct,
                ListCategory,
                DetailCategory,
                ListWishlist,
                DetailWishlist,
                ListTag,
                DetailTag,
                ListCart,
                ListOrders,
                DetailOrders,
                OrderTest,
                Order_details,
                OrderItemDetail,
                RatingView
                )
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('', ApiRoot.as_view(), name='root'),
    path('products', ListProduct.as_view(), name='products'),
    path('products/<int:pk>/', DetailProduct.as_view(), name='singleproduct'),
    path('category', ListCategory.as_view(), name='category'),
    path(
        'category/<int:pk>/',
        DetailCategory.as_view(),
        name='singlecategory'
        ),
    path('wishlist', ListWishlist.as_view(), name='wishlist'),
    path(
        'wishlist/<int:pk>/',
        DetailWishlist.as_view(),
        name='wishlistcategory'
        ),
    path('tag', ListTag.as_view(), name='tag'),
    path('tag/<int:pk>/', DetailTag.as_view(), name='tagcategory'),
    path('cart', ListCart.as_view(), name='cart'),
    path('order', ListOrders.as_view(), name='order'),
    path('order/<int:pk>/', DetailOrders.as_view(), name='ordercategory'),
    path('order/test/', OrderTest.as_view(), name='ordertest'),
    path('orderdetail/', Order_details.as_view(), name='orderdetail'),
    path(
        'orderitemdetail/',
        OrderItemDetail.as_view(),
        name='orderitemdetail'
        ),
    path('rating/', RatingView.as_view(), name='rating'),
]

urlpatterns = format_suffix_patterns(urlpatterns)
