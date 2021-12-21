from django.contrib import admin
from .models import *


# SECTION - ADMIN PANEL SETTINGS

# ANCHOR -  PROJECT

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("name", "price","label", "id", "link", "description")
    search_fields = ["name", "label", "link"]

    def get_actions(self, request):
        actions = super().get_actions(request)
        if 'delete_selected' in actions:
            del actions['delete_selected']
        return actions  

# ANCHOR -  FEATURES

@admin.register(ProjectFeature)
class ProjectFeatureAdmin(admin.ModelAdmin):
    list_display = ("id", "feature", )

# ANCHOR -  IMAGES

@admin.register(ProjectImage)
class ProjectImageAdmin(admin.ModelAdmin):
    list_display = ("resolve_image", "alt", "id" )
    readonly_fields = ('resolve_image', )
