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
    ip = models.GenericIPAddressField(editable=False, null=True, blank=True)

    def __str__(self):
        return self.email

    def save_model(self, request, follower, form, change):
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = request.META.get('REMOTE_ADDR')
        follower.ip_address = ip
        if follower.parent != None:
            follower.post = follower.parent.post
        follower.save()

    