import graphene
from graphene_django.types import DjangoObjectType, ObjectType
from .models import *
from datetime import datetime
from django.utils import timezone


class HobbyType(DjangoObjectType):
    class Meta:
        model = Hobby


class EducationType(DjangoObjectType):
    class Meta:
        model = Education


class ExperienceType(DjangoObjectType):
    class Meta:
        model = Experience


class CertificateType(DjangoObjectType):
    class Meta:
        model = Certificate


class LanguageType(DjangoObjectType):
    class Meta:
        model = Language


class SkillCategoryType(DjangoObjectType):
    class Meta:
        model = SkillCategory


class SkillType(DjangoObjectType):
    class Meta:
        model = Skill


class CvType(DjangoObjectType):
    class Meta:
        model = Cv

class JobType(DjangoObjectType):
    class Meta:
        model = Job


class Query(graphene.ObjectType):
    hobbies = graphene.List(HobbyType)

    # ANCHOR -  GET ALL HOBBIES
    def resolve_hobbies(self, info, **kwargs):
        return Hobby.objects.all()

    educations = graphene.List(EducationType)

    # ANCHOR -  GET ALL EDUCATIONS
    def resolve_educations(self, info, **kwargs):
        return Education.objects.all()

    experiences = graphene.List(ExperienceType)

    # ANCHOR -  GET ALL EXPERIENCES
    def resolve_experiences(self, info, **kwargs):
        return Experience.objects.all()

    certificates = graphene.List(CertificateType)

    # ANCHOR -  GET ALL CERTIFICATES
    def resolve_certificates(self, info, **kwargs):
        return Certificate.objects.all()

    languages = graphene.List(LanguageType)

    # ANCHOR -  GET ALL LANGUAGES
    def resolve_languages(self, info, **kwargs):
        return Language.objects.all()

    skillCategories = graphene.List(SkillCategoryType)

    # ANCHOR -  GET ALL SKILLS
    def resolve_skillCategories(self, info, **kwargs):
        return SkillCategory.objects.all()

    skills = graphene.List(SkillType)

    # ANCHOR -  GET ALL SKILLS
    def resolve_skills(self, info, **kwargs):
        return Skill.objects.all()

    cv = graphene.Field(CvType)

    # ANCHOR -  GET ALL SKILLS
    def resolve_cv(self, info, **kwargs):
        return Cv.objects.all().last()

    jobs = graphene.List(JobType)

    # ANCHOR -  GET ALL SKILLS
    def resolve_jobs(self, info, **kwargs):
        return Job.objects.all()

schema = graphene.Schema(query=Query)
