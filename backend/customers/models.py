from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
# Create your models here.

class UserAccountManager(BaseUserManager):
    def create_user(self, email, username, password=None):
        if not email:
            raise ValueError("User must have a valid email address!")
        if not username:
            raise ValueError("User must have a valid username!")
    
        user = self.model(
            email=self.normalize_email(email), #  it lowercases the email input
            username=username,
        )
        user.set_password(password)
        user.save(using=self._db)

        return user


    def create_superuser(self, email, username, password):
        user = self.create_user(
            email=self.normalize_email(email),
            username=username,
            password=password
        )

        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)

        return user

class User(AbstractBaseUser):
    email = models.EmailField(max_length=100, unique=True)
    # required fields
    username = models.CharField(max_length=50, unique=True, blank=True)
    date_joined = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(auto_now=True)
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    # custom fields
    first_name = models.CharField(max_length=60, blank=True)
    last_name = models.CharField(max_length=60, blank=True)
    phone = models.IntegerField(default=9999999999, blank=True)
    # address = models.TextField(null=True, blank=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return f"{self.email} : {self.username}"

    def has_perm(self, perm, object=None):
        return self.is_admin
    
    def has_module_perms(self, app_lable):
        return True

    objects = UserAccountManager()

class Address(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    zipcode = models.IntegerField()
    address1 = models.CharField(max_length=100)
    address2 = models.CharField(max_length=100, blank=True, null=True)
    city = models.CharField(max_length=50, blank=True, null=True)
    state = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.state} : {self.zipcode}"

class React(models.Model):
    name = models.CharField(max_length=30)
    quote = models.CharField(max_length=300)
