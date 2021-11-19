from django.db import models

# Create your models here.

class Education(models.Model):
    name = models.CharField(max_length=54)

    def __str__(self):
        return self.name