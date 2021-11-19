from django.contrib import admin
from .models import *


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ("title", "Thumbnail", "published", "id", "author",  "slug", "short_description", "created_at", "updated_at", "deleted_on")
    list_filter = ['tag', "published", "deleted", "created_at", "updated_at", "deleted_on"]
    list_select_related = ('author', )
    readonly_fields= ('Thumbnail', "deleted", )

    def save_model(self, request, post, form, change):
        if post.deleted_on != None:
            return
        if getattr(post, 'author', None) is None:
            post.author = request.user
        post.save()

@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ("id", "name")

@admin.register(PostMeta)
class CommentAdmin(admin.ModelAdmin):
    list_display = ("post", "id", "name", "content")
    list_filter = ['post', ]

@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ("post", "is_approved", "username", "short_comment", "ip_address", "created_at", "updated_at", "deleted_on")
    list_filter = ['post', 'is_approved', "ip_address", "deleted", "created_at"]

    def save_model(self, request, comment, form, change):
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = request.META.get('REMOTE_ADDR')
        comment.ip_address = ip
        comment.save()