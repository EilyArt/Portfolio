from django.contrib import admin
from .models import *

# SECTION - ADMIN PANEL SETTINGS

# ANCHOR -  POST


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ("slug", "views", "title", "Thumbnail", "published", "id", "author",
                    "short_description", "created_at", "updated_at")
    list_filter = ["published", "created_at",
                   "updated_at", "tags"]
    list_select_related = ('author', )
    search_fields = ['title', "slug", "title"]
    readonly_fields = ('Thumbnail', "views")
    ordering = ('-id', )

    def get_actions(self, request):
        actions = super().get_actions(request)
        if 'delete_selected' in actions:
            del actions['delete_selected']
        return actions  


# ANCHOR -  TAG
@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ("id", "name")


# ANCHOR -  POST_META
@admin.register(PostMeta)
class CommentAdmin(admin.ModelAdmin):
    list_display = ("post_id", "id", "name", "content")
    list_filter = ['post', ]
    ordering = ('-post_id', )


# ANCHOR -  COMMENT
@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ("username", "ip_address", "email", "is_approved", "id", "parent_id", "post_id", "like", "dislike", 
                    "short_comment", "created_at", "deleted_on")
    readonly_fields = ('ip_address', )
    list_filter = ['is_approved', "ip_address", "created_at", "post"]
    ordering = ('-id', )
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
        if comment.deleted_on != None:
            comment.is_approved = False
        comment.save()
