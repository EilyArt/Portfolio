from django.db import models
from django.urls import reverse
from django.utils.translation import gettext_lazy as _
# Create your models here.

class Tag(models.Model):

    name = models.CharField(
        verbose_name=_("Post Title"),
        help_text=_("Required and unique"),
        max_length=255,
        unique=True,
    )
    slug = models.SlugField(verbose_name=_("Post safe URL"), max_length=255, unique=True)

    def __str__(self):
        return self.name

class Post(models.Model):

    title = models.CharField(
        verbose_name=_("Post Title"),
        help_text=_("Required and unique"),
        max_length=255,
        unique=True,
    )
    slug = models.SlugField(verbose_name=_("Post safe URL"), max_length=255, unique=True)
    # tag = models.ForeignKey(Tag, on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True)

    class Meta:
        # ordering = ("-created_at",)
        verbose_name = _("Post")
        verbose_name_plural = _("Posts")

    def __str__(self):
        return self.title

