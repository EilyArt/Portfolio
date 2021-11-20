from django.contrib import admin

# Register your models here.
from .models import *

@admin.register(Page)
class PageAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "description", "link")
    
@admin.register(MetaData)
class MetaDataAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "content", "page")
    