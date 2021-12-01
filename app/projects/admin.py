from django.contrib import admin
from .models import *


# SECTION - ADMIN PANEL SETTINGS

# ANCHOR -  PROJECT

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "label", "price", "description", "link")


# ANCHOR -  FEATURES

@admin.register(ProjectFeature)
class ProjectFeatureAdmin(admin.ModelAdmin):
    list_display = ("id", "feature", )

# ANCHOR -  IMAGES

@admin.register(ProjectImage)
class ProjectImageAdmin(admin.ModelAdmin):
    list_display = ("id", "resolve_image", "alt")
    readonly_fields = ('resolve_image', )
