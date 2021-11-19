from django.db import models
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import User
import datetime
from django.utils.html import mark_safe
from django.template.defaultfilters import truncatechars
from ckeditor_uploader.fields import RichTextUploadingField

# MIXINS ----------

#Timestamp
class TimeStampMixin(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted = models.BooleanField(default=False, editable=False)
    deleted_on = models.DateTimeField(blank=True, null=True, editable=False)

    class Meta:
        abstract = True

#QUERY SETS ----------

#Post query
class PostQuerySet(models.QuerySet):
    def delete(self, *args, **kwargs):
        for post in self:
            post.published = False
            post.thumbnail.delete()
            post.deleted_on = datetime.datetime.now()
            post.deleted = True
            post.save(update_fields=["deleted_on", "deleted", "published"])
        super(PostQuerySet, self).update()

#Comment query
class CommentQuerySet(models.QuerySet):
    def delete(self, *args, **kwargs):
        for comment in self:
            comment.deleted_on = datetime.datetime.now()
            comment.deleted = True
            comment.save(update_fields=["deleted_on", "deleted"])
        super(CommentQuerySet, self).update()

#MODELS ----------

#Tag model
class Tag(models.Model):
    name = models.CharField(max_length=54)

    def __str__(self):
        return self.name

#Post model
class Post(TimeStampMixin):
    objects = PostQuerySet.as_manager()
    published = models.BooleanField(default=False, verbose_name="publish")
    author = models.ForeignKey(User, null=True, blank=True, on_delete=models.SET_NULL, editable=False)
    title = models.CharField(max_length=285, blank=True, null=True, unique=True)
    description = RichTextUploadingField()
    slug = models.SlugField(verbose_name=_("Post URL"), max_length=256, unique=True)
    tag = models.ManyToManyField(Tag)
    thumbnail = models.ImageField(upload_to="media/static/images/", default=None)

    def __str__(self):
        return self.title

    # Show Thumbnail image in admin panel
    def Thumbnail(self):
        if self.thumbnail:
            return mark_safe('<img src="{}" height="35" width="35" />'.format(self.thumbnail.url))
        else:
            return ''

    # description overflow ...
    @property
    def short_description(self):
        return truncatechars(self.description, 35)

    # delete constraint for direct deleting a post
    def delete(self, *args, **kwargs):
        post = Post.objects.get(id=self.id)
        post.published = False
        post.thumbnail.delete()
        post.deleted_on = datetime.datetime.now()
        post.deleted = True
        post.save(update_fields=["deleted_on", "deleted", "published"])

    # delete old image on updating the image field
    def save(self, *args, **kwargs):
        try:
            this = Post.objects.get(id=self.id)
            if this.thumbnail != self.thumbnail:
                this.thumbnail.delete()
        except:
            pass
        super(Post, self).save(*args, **kwargs)

#Post_meta model
class PostMeta(models.Model):
    post = models.ForeignKey(Post, null=False, blank=False, on_delete = models.CASCADE)
    name = models.CharField(max_length=54)
    content = models.TextField()
    def __str__(self):
        return self.name

#Comment model
class Comment(TimeStampMixin):
    objects = CommentQuerySet.as_manager()
    post = models.ForeignKey(Post, null=False, blank=False, on_delete=models.CASCADE)
    username = models.CharField(max_length=128)
    comment = models.CharField(max_length=1024, blank=True, null=True)
    ip_address = models.GenericIPAddressField(editable=False)
    is_approved = models.BooleanField(default=False)

    def __str__(self):
        return self.comment

    # comment overflow ...
    @property
    def short_comment(self):
        return truncatechars(self.comment, 35)

    # delete constraint for direct deleting a comment
    def delete(self, *args, **kwargs):
        comment = Comment.objects.get(id=self.id)
        comment.deleted_on = datetime.datetime.now()
        comment.deleted = True
        comment.save(update_fields=["deleted_on", "deleted"])
