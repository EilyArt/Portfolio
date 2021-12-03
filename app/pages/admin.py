from django.contrib import admin

# Register your models here.
from .models import *

@admin.register(Page)
class PageAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "slug")
    search_fields = ['title', "slug", ]
    ordering = ('-id', )
    list_filter = ["title", "slug"]
    
@admin.register(MetaData)
class MetaDataAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "content", "page")
    list_filter = ["page",  ]
    