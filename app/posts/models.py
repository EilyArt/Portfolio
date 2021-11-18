from django.db import models
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import User
import datetime

class TimeStampMixin(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted = models.BooleanField(default=False, editable=False)
    deleted_on = models.DateTimeField(blank=True, null=True, editable=False)

    class Meta:
        abstract = True

class PostQuerySet(models.QuerySet):
    def delete(self, *args, **kwargs):
        for post in self:
            post.thumbnail.delete()
            post.deleted_on = datetime.datetime.now()
            post.deleted = True
            post.save(update_fields=["deleted_on", "deleted"])
        super(PostQuerySet, self).update()

class Tag(models.Model):
    name = models.CharField(max_length=285)
    value = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)

    def __str__(self):
        return self.name

class Post(TimeStampMixin):
    objects = PostQuerySet.as_manager()
    author = models.ForeignKey(User, null=True, blank=True, on_delete=models.SET_NULL)
    title = models.CharField(max_length=285, blank=True, null=True)
    description = models.TextField()
    slug = models.SlugField(verbose_name=_("Post URL"), max_length=255, unique=True)
    tag = models.ManyToManyField(Tag)
    thumbnail = models.ImageField(upload_to="images/", default=None)
    published = models.BooleanField(default=False, verbose_name="publish")

    def __str__(self):
        return self.title

    def delete(self, *args, **kwargs):
        for post in self:
            post.thumbnail.delete()
        super(PostQuerySet, self).delete()


class Comment(models.Model):
    post = models.ForeignKey(Post, null=True, blank=True, on_delete=models.CASCADE)
    author = models.CharField(max_length=128)
    comment = models.CharField(max_length=1024, blank=True, null=True)
    ip_address = models.GenericIPAddressField()
    is_approved = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True, blank=True)
    deleted_on = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return self.comment