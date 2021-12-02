from django.contrib import admin
from .models import *


# SECTION - ADMIN PANEL SETTINGS

# ANCHOR -  PROJECT

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "label", "price", "description", "link")
    
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
    list_display = ("id", "resolve_image", "alt")
    readonly_fields = ('resolve_image', )
