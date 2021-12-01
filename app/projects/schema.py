import graphene
from graphene_django.types import DjangoObjectType, ObjectType
from .models import *
from datetime import datetime
from django.utils import timezone
from graphene.types.generic import GenericScalar


class ProjectType(DjangoObjectType):
    meta = GenericScalar()

    class Meta:
        model = Project

class ProjectFeatureType(DjangoObjectType):
    meta = GenericScalar()

    class Meta:
        model = ProjectFeature

class ProjectImageType(DjangoObjectType):
    meta = GenericScalar()

    class Meta:
        model = ProjectImage


class Query(graphene.ObjectType):

    # SECTION - POST

    # ANCHOR -  GET ALL PROJECTS
    allProjects = graphene.List(ProjectType)

    def resolve_allProjects(self, info, **kwargs):
        return Project.objects.order_by('-id').all()


schema = graphene.Schema(query=Query)
