from django.contrib import admin

# Register your models here.

from .models import *
# Register your models here.

@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    # list_display = ("id", "name")
    pass