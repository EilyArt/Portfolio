from django.contrib import admin
from .models import *

# SECTION - ADMIN PANEL SETTINGS

# ANCHOR -  POST


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ("title", "Thumbnail", "published", "id", "author",
                    "slug", "short_description", "created_at", "updated_at", "deleted_on")
    list_filter = ["published", "created_at",
                   "updated_at", "deleted_on", "tags"]
    list_select_related = ('author', )
    search_fields = ['title']
    readonly_fields = ('Thumbnail', )
    ordering = ('-id', )

    def save_model(self, request, post, form, change):
        if post.deleted_on != None:
            return
        if getattr(post, 'author', None) is None:
            post.author = request.user
        post.save()


# ANCHOR -  TAG
@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ("id", "name")


# ANCHOR -  POST_META
@admin.register(PostMeta)
class CommentAdmin(admin.ModelAdmin):
    list_display = ("post", "id", "name", "content")
    list_filter = ['post', ]


# ANCHOR -  COMMENT
@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ("id", "parent_id", "is_approved", "likes", "dislikes", "username", "ip_address",
                    "short_comment", "post", "created_at", "updated_at", "deleted_on")
    list_filter = ['post', 'is_approved', "ip_address", "created_at"]

    # REVIEW -  GET IP ADDRESS *MAYBE NOT REQUIRED FOR ADMIN PANEL*
    def save_model(self, request, comment, form, change):
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = request.META.get('REMOTE_ADDR')
        comment.ip_address = ip
        if comment.parent != None:
            comment.post = comment.parent.post
        comment.save()
