from django.contrib import admin
from .models import *
from django.utils.html import mark_safe


admin.site.register(Comment)
admin.site.register(Tag)

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ("title", "published", "id", "author",  "slug", "thumbnail", "created_at", "updated_at", "deleted_on")
    list_filter = ['tag', "published", "deleted", "deleted_on"]
    list_select_related = (
        'author',
    )