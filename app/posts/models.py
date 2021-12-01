from django.db import models
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import User
import datetime
from django.utils.html import mark_safe
from django.template.defaultfilters import truncatechars
from ckeditor_uploader.fields import RichTextUploadingField
from django.core.validators import MinValueValidator, MaxValueValidator

# SECTION - MIXINS

# ANCHOR - TIMESTAMPS


class TimeStampMixin(models.Model):

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True, blank=True, null=True)

    deleted_on = models.DateTimeField(blank=True, null=True, editable=False)

    class Meta:
        abstract = True


# SECTION -  QUERYIES

# ANCHOR - POST
class PostQuerySet(models.QuerySet):
    def delete(self, *args, **kwargs):
        for post in self:
            post.published = False
            post.thumbnail.delete()
            post.deleted_on = datetime.datetime.now()
            post.save(update_fields=["deleted_on", "published"])
        super(PostQuerySet, self).update()


# ANCHOR - COMMENT
class CommentQuerySet(models.QuerySet):
    def delete(self, *args, **kwargs):
        for comment in self:
            comment.deleted_on = datetime.datetime.now()
            comment.save(update_fields=["deleted_on"])
        super(CommentQuerySet, self).update()


# SECTION - MODELS

# ANCHOR - TAG
class Tag(models.Model):

    name = models.SlugField(verbose_name=_("Tag Name"),
                            max_length=20, unique=True)

    def __str__(self):
        return self.name


# ANCHOR -  POST
PERCENTAGE_VALIDATOR = [MinValueValidator(0), MaxValueValidator(100)]


class Post(TimeStampMixin):

    objects = PostQuerySet.as_manager()

    published = models.BooleanField(default=False, verbose_name="publish")

    author = models.ForeignKey(
        User, null=True, blank=True, on_delete=models.SET_NULL, editable=False)

    title = models.CharField(
        max_length=285, blank=True, null=True, unique=True)

    excerpt = models.TextField(
        max_length=350, verbose_name="short description")

    duration = models.DecimalField(
        max_digits=2, decimal_places=1, default=3, validators=PERCENTAGE_VALIDATOR)

    description = RichTextUploadingField()

    slug = models.SlugField(verbose_name=_("Post Slug"),
                            max_length=256, unique=True)

    thumbnail = models.ImageField(upload_to="static/images/", default=None)

    thumbnail_alt = models.CharField(max_length=54, blank=False, null=False)

    tags = models.ManyToManyField(Tag)

    def __str__(self):
        return self.title

    # ANCHOR - DISPLAY THUMBNAIL IN ADMIN PANEL
    def Thumbnail(self):
        if self.thumbnail:
            return mark_safe('<img src="{}" height="35" width="35" />'.format(self.thumbnail.url))
        else:
            return ''

    # ANCHOR - REMOVE DESCRIPTION OVERFLOW
    @property
    def short_description(self):
        return truncatechars(self.description, 35)

    # ANCHOR - SOFT DELETE POST
    def delete(self, *args, **kwargs):
        post = Post.objects.get(id=self.id)
        post.published = False
        post.thumbnail.delete()
        post.deleted_on = datetime.datetime.now()
        post.deleted = True
        post.save(update_fields=["deleted_on", "published"])

    # FIXME - GET ALL TAGS OF A POST
    def get_tags(self):
        return "\n".join([p.tags.id for p in self.tags.all()])

    # FIXME - REPLACE OLD IMAGE
    def save(self, *args, **kwargs):
        try:
            this = Post.objects.get(id=self.id)
            if this.thumbnail != self.thumbnail:
                this.thumbnail.delete()
        except:
            pass
        super(Post, self).save(*args, **kwargs)


# ANCHOR - POST_META
class PostMeta(models.Model):

    post = models.ForeignKey(
        Post, null=False, blank=False, on_delete=models.CASCADE)

    name = models.CharField(max_length=54)

    content = models.TextField()

    def __str__(self):
        return self.name


# ANCHOR - COMMENT
class Comment(TimeStampMixin):

    objects = CommentQuerySet.as_manager()

    post = models.ForeignKey(
        Post, null=False, blank=False, on_delete=models.CASCADE)

    username = models.CharField(max_length=128)

    comment = models.CharField(max_length=1024, blank=True, null=True)

    ip_address = models.GenericIPAddressField(editable=False)

    is_approved = models.BooleanField(default=False)

    likes = models.PositiveIntegerField(default=0, blank=False, null=False)

    dislikes = models.PositiveIntegerField(default=0, blank=False, null=False)

    parent = models.ForeignKey(
        'self', null=True, blank=True, related_name='replies', on_delete=models.CASCADE)

    class Meta:
        ordering = ('-id',)

    # ANCHOR - REMOVE DESCRIPTION OVERFLOW
    @property
    def short_comment(self):
        return truncatechars(self.comment, 35)

    def __str__(self):
        return self.short_comment

    # ANCHOR - REMOVE COMMENT OVERFLOW
    @property
    def short_comment(self):
        return truncatechars(self.comment, 35)

    # ANCHOR - SOFT DELETE COMMENT
    def delete(self, *args, **kwargs):
        comment = Comment.objects.get(id=self.id)
        comment.deleted_on = datetime.datetime.now()
        comment.deleted = True
        comment.save(update_fields=["deleted_on"])
