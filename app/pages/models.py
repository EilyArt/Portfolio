from django.db import models

# Create your models here.

# TODO - Remove descrition and rename link to slug with verbose name
class Page(models.Model):
    title = models.CharField(max_length=54)
    slug = models.SlugField(max_length=256, unique=True, blank=True, verbose_name="page link")

    def __str__(self):
        return self.title


class MetaData(models.Model):
    name = models.CharField(max_length=54)
    content = models.TextField()
    page = models.ForeignKey(Page, null=False, blank=False, on_delete=models.CASCADE)

    def __str__(self):
        return self.name
