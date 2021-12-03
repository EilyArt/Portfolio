from django.contrib import admin

# Register your models here.
from .models import *

@admin.register(Page)
class PageAdmin(admin.ModelAdmin):
    list_display = ("title", "id", "slug")
    search_fields = ['title', "slug", ]
    ordering = ('-id', )
    list_filter = ["title", "slug"]
    
@admin.register(MetaData)
class MetaDataAdmin(admin.ModelAdmin):
    list_display = ("page", "id", "name", "content", )
    list_filter = ["page",  ]
    ordering = ('-id', )
    