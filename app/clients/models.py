from django.db import models
from phonenumber_field.modelfields import PhoneNumberField
# Create your models here.

class Contact(models.Model):
    name = models.CharField(max_length=54)
    surname = models.CharField(max_length=54)
    email = models.EmailField()
    phone = PhoneNumberField(blank=True)
    description = models.TextField()
    appointment_date = models.DateField()
    budeget = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name