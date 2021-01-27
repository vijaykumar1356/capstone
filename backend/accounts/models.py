from django.db import models
from django.contrib.auth.models import (
                                AbstractBaseUser,
                                PermissionsMixin,
                                BaseUserManager
                                )


class UserAccountManager(BaseUserManager):
    def create_user(
                    self,
                    email,
                    username,
                    first_name,
                    last_name,
                    phone,
                    address,
                    password=None
                    ):
        if not email:
            raise ValueError('Users must have an email address')

        email = self.normalize_email(email)
        user = self.model(
                        email=email,
                        username=username,
                        first_name=first_name,
                        last_name=last_name,
                        phone=phone,
                        address=address
                        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(
                        self,
                        email,
                        username,
                        first_name,
                        last_name,
                        phone,
                        address,
                        password
                        ):

        user = self.create_user(
                        email=self.normalize_email(email),
                        password=password,
                        username=username,
                        first_name=first_name,
                        last_name=last_name,
                        phone=phone,
                        address=address
                        )
        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class UserAccount(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)
    username = models.CharField(max_length=255, blank=True)
    first_name = models.CharField(max_length=255, blank=True)
    last_name = models.CharField(max_length=255, blank=True)
    phone = models.CharField(max_length=12,blank=True)
    address = models.CharField(max_length=255, blank=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = [
                    'username',
                    'first_name',
                    'last_name',
                    'phone',
                    'address'
                    ]

    def __str__(self):
        return self.email
