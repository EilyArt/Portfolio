from django.contrib import admin
from .models import *

# SECTION - ADMIN PANEL SETTINGS

# ANCHOR -  EDUCATION


@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    list_display = ("id", "institution", "title",
                    "start_date", "end_date", "description")


@admin.register(Hobby)
class HobbyAdmin(admin.ModelAdmin):
    list_display = ("id", "name")


# ANCHOR -  EXPERIENCE

@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ("id", "job", "company", "start_date",
                    "end_date", "description")


# ANCHOR -  CERTIFICATE

@admin.register(Certificate)
class CertificateAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "date")


# ANCHOR -  LANGUAGE

@admin.register(Language)
class LanguageAdmin(admin.ModelAdmin):
    list_display = ("id", "language", "level")


# ANCHOR -  SKILL_CATEGORY

@admin.register(SkillCategory)
class SkillCategoryAdmin(admin.ModelAdmin):
    list_display = ("id", "title")


# ANCHOR -  SKILL

@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "percentage", "SkillLogo", "category")
    list_filter = ['category', ]
    readonly_fields = ('SkillLogo',)


# ANCHOR -  CV
@admin.register(Cv)
class CvAdmin(admin.ModelAdmin):
    list_display = ("id", "Photo", "CV", "alt", "phone",
                    "email", "address", "about_me")
    readonly_fields = ('Photo', )


# ANCHOR -  JOB
@admin.register(Job)
class JobAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "Svg", "alt", "description")
