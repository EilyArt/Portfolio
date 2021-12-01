from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.utils.html import mark_safe


# SECTION - MODELS

# ANCHOR - EDUCATION

class Hobby(models.Model):
    name = models.CharField(max_length=54)

    def __str__(self):
        return self.name


# ANCHOR - EDUCATION

class Education(models.Model):
    title = models.CharField(max_length=54)
    institution = models.CharField(max_length=54)
    start_date = models.DateField(null=False, blank=False)
    end_date = models.DateField(null=False, blank=False)
    description = models.CharField(max_length=180)

    def __str__(self):
        return self.title


# ANCHOR - EXPERIENCE

class Experience(models.Model):
    job = models.CharField(max_length=54, verbose_name="Job Title")
    company = models.CharField(max_length=54)
    start_date = models.DateField(null=False, blank=False)
    end_date = models.DateField(null=False, blank=False)
    description = models.CharField(max_length=180)

    def __str__(self):
        return self.job


# ANCHOR - CERTIFICATE

class Certificate(models.Model):
    title = models.CharField(max_length=54)
    date = models.DateField(null=False, blank=False)

    def __str__(self):
        return self.title


# ANCHOR - LANGUAGE
class Language(models.Model):
    language = models.CharField(max_length=54)
    level = models.CharField(max_length=20)

    def __str__(self):
        return self.language


# ANCHOR - SKILL_CATEGORY
class SkillCategory(models.Model):
    title = models.CharField(max_length=54)

    def __str__(self):
        return self.title


# ANCHOR - SKILL
PERCENTAGE_VALIDATOR = [MinValueValidator(0), MaxValueValidator(100)]

class Skill(models.Model):
    title = models.CharField(max_length=54)
    logo = models.ImageField(upload_to="static/images/", default=None)
    percentage = models.DecimalField(
        max_digits=3, decimal_places=0, default=0, validators=PERCENTAGE_VALIDATOR)
    category = models.ForeignKey(SkillCategory, on_delete=models.CASCADE)

    # ANCHOR - DISPLAY LOGO IN ADMIN PANEL
    def SkillLogo(self):
        if self.logo:
            return mark_safe('<img src="{}" height="35" width="35" />'.format(self.logo.url))
        else:
            return ''

    def __str__(self):
        return self.title
