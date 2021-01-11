from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Address, React



class CustomUserAdmin(UserAdmin):
    list_display = ('id', 'email', 'username', 'date_joined', 'last_login', 'first_name', 'last_name','phone', 'is_active', 'is_staff', 'is_admin',)
    search_fields = ('email', 'username')
    readonly_fields = ('date_joined', 'last_login')
    filter_horizontal = ()
    list_filter = ()
    fieldsets = ()


class AddressAdmin(admin.ModelAdmin):
    list_display = ('user', 'zipcode', 'address1', 'address2', 'city', 'state')

class ReactAdmin(admin.ModelAdmin):
    list_display = ('name', 'quote')

admin.site.register(User, CustomUserAdmin)
admin.site.register(Address, AddressAdmin)
admin.site.register(React, ReactAdmin)