from django.contrib import admin

from .models import *
# Register your models here.

@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ("id", "created_at", "name", "email", "description", "subject")
    list_filter = ["created_at", ]