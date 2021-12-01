from django.db import models
from django.utils.html import mark_safe
from django.utils.translation import gettext_lazy as _
# Create your models here.

# SECTION - MODELS

# ANCHOR - PROJECT_IMAGE
class ProjectImage(models.Model):
    image = models.ImageField(upload_to="media/static/images/", default=None)
    alt = models.CharField(max_length=54, blank=False, null=False)

    def __str__(self):
        return self.alt
    
    # FIXME - DISPLAY IMAGE IN ADMIN PANEL
    def resolve_image(self):
        if self.image:
            return mark_safe('<img src="{}" height="35" width="35" />'.format(self.image.url))
        else:
            return ''

# ANCHOR - PROJECT_FEATURE
class ProjectFeature(models.Model):
    feature = models.CharField(max_length=54, blank=False, null=False)

    def __str__(self):
        return self.feature
    

# ANCHOR - PROJECT
class Project(models.Model):
    name = models.CharField(max_length=30)
    label = models.CharField(max_length=30)
    price = models.PositiveIntegerField(default=0, blank=False, null=False)
    description = models.TextField(max_length=80)
    images = models.ManyToManyField(ProjectImage)
    features = models.ManyToManyField(ProjectFeature)
    link = models.CharField(verbose_name=_("Project Link"), max_length=256, unique=True)

    def __str__(self):
        return self.name
    
    # FIXME - DISPLAY THUMBNAIL IN ADMIN PANEL
    # def Images(self):
    #     if self.images:
    #         return mark_safe('<img src="{}" height="35" width="35" />'.format(self.images.url))
    #     else:
    #         return ''