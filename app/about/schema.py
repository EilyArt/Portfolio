import graphene
from graphene_django.types import DjangoObjectType, ObjectType
from .models import *
from datetime import datetime
from django.utils import timezone


class EducationType(DjangoObjectType):
    class Meta:
        model = Education

class Query(graphene.ObjectType):
    allposts = graphene.List(EducationType)

    # get all the blog posts
    def resolve_allposts(self, info, **kwargs):
        return Education.objects.all()


schema = graphene.Schema(query=Query)