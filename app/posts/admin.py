from django.contrib import admin
from django.forms import Textarea, TextInput
from .models import *


admin.site.register(Comment)
@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ("id", "author", "title", "description", "slug", "image", "created_at", "updated_at")
    list_filter = ['tag']
    # list_select_related = (
    #     'author',
    # )
admin.site.register(Tag)
admin.site.register(Image)

