from django.db import models
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import User
import datetime
from django.utils.html import mark_safe


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
            post.published = False
            post.thumbnail.delete()
            post.deleted_on = datetime.datetime.now()
            post.deleted = True
            post.save(update_fields=["deleted_on", "deleted", "published"])
        super(PostQuerySet, self).update()


class Tag(models.Model):
    name = models.CharField(max_length=285)
    value = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)

    def __str__(self):
        return self.name


class Post(TimeStampMixin):
    objects = PostQuerySet.as_manager()
    author = models.ForeignKey(
        User, null=True, blank=True, on_delete=models.SET_NULL, editable=False)
    title = models.CharField(max_length=285, blank=True, null=True)
    description = models.TextField()
    slug = models.SlugField(verbose_name=_("Post URL"),
                            max_length=255, unique=True)
    tag = models.ManyToManyField(Tag)
    thumbnail = models.ImageField(upload_to="images/", default=None)
    published = models.BooleanField(default=False, verbose_name="publish")

    def __str__(self):
        return self.title

    def Thumbnail(self):
        if self.thumbnail:
            return mark_safe('<img src="{}" height="50" width="50" />'.format(self.thumbnail.url))
        else:
            return ''

    def delete(self, *args, **kwargs):
        post = Post.objects.get(id=self.id)
        post.published = False
        post.thumbnail.delete()
        post.deleted_on = datetime.datetime.now()
        post.deleted = True
        post.save(update_fields=["deleted_on", "deleted", "published"])
        

    def save(self, *args, **kwargs):
        try:
            this = Post.objects.get(id=self.id)
            if this.thumbnail != self.thumbnail:
                this.thumbnail.delete()
        except:
            pass
        super(Post, self).save(*args, **kwargs)


class Comment(models.Model):
    post = models.ForeignKey(
        Post, null=True, blank=True, on_delete=models.CASCADE)
    author = models.CharField(max_length=128)
    comment = models.CharField(max_length=1024, blank=True, null=True)
    ip_address = models.GenericIPAddressField()
    is_approved = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True, blank=True)
    deleted_on = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return self.comment
