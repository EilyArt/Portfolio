from django.db import models
# from phonenumber_field.modelfields import PhoneNumberField
# Create your models here.

class Contact(models.Model):
    name = models.CharField(max_length=54)
    email = models.EmailField()
    description = models.TextField()
    subject = models.CharField(max_length=54)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Follower(models.Model):
    email = models.EmailField(unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.email