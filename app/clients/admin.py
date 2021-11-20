from django.contrib import admin

from .models import *
# Register your models here.

@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ("id", "created_at", "name", "surname", "email", "phone", "description", "appointment_date", "budeget")
    list_filter = ["created_at", "appointment_date", ]