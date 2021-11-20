from django.contrib import admin

# Register your models here.
from .models import *

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "price", "thumbnail", "description")
    
@admin.register(ProjectImage)
class ProjectImageAdmin(admin.ModelAdmin):
    list_display = ("id", "alt", "image", "project")
    list_filter = ['project', ]