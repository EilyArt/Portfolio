from django.contrib import admin

from .models import *
# Register your models here.

@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    list_display = ("id", "institution", "title", "start_date", "end_date", "description")

@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ("id", "job", "company", "start_date", "end_date", "description")

@admin.register(Certificate)
class CertificateAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "date")

@admin.register(Language)
class LanguageAdmin(admin.ModelAdmin):
    list_display = ("id", "language", "level")

@admin.register(SkillCategory)
class SkillCategoryAdmin(admin.ModelAdmin):
    list_display = ("id", "title")

@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "percentage", "SkillLogo", "category")
    list_filter = ['category', ]
    readonly_fields = ('SkillLogo',)
