from django.db import models
from django.utils.html import mark_safe
from django.utils.translation import gettext_lazy as _
# Create your models here.


class Project(models.Model):
    name = models.CharField(max_length=54)
    price = models.IntegerField()
    description = models.TextField()
    thumbnail = models.ImageField(upload_to="media/static/images/", default=None)
    link = models.SlugField(verbose_name=_("Project Link"), max_length=256, unique=True)

    def __str__(self):
        return self.name
    
    # Show thumbnail in admin panel
    def Thumbnail(self):
        if self.thumbnail:
            return mark_safe('<img src="{}" height="35" width="35" />'.format(self.thumbnail.url))
        else:
            return ''


class ProjectImage(models.Model):
    image = models.ImageField(upload_to="media/static/images/", default=None)
    alt = models.CharField(max_length=54)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)

    def __str__(self):
        return self.alt
    
        # Show image in admin panel
    def Image(self):
        if self.image:
            return mark_safe('<img src="{}" height="35" width="35" />'.format(self.image.url))
        else:
            return ''
