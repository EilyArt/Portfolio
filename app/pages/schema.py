import graphene
from graphene_django.types import DjangoObjectType
from .models import *
from graphene.types.generic import GenericScalar


class PageType(DjangoObjectType):
    meta = GenericScalar()

    class Meta:
        model = Page


class MetaDataType(DjangoObjectType):
    meta = GenericScalar()

    class Meta:
        model = MetaData


class Query(graphene.ObjectType):

    # SECTION - PAGE

    # ANCHOR - GET PAGE BY SLUG
    pageMetas = graphene.List(MetaDataType, page=graphene.String())

    def resolve_pageMetas(self, info, page):
        try:
            page = Page.objects.get(slug=page)
            return MetaData.objects.all().filter(page=page)
        except:
            return


schema = graphene.Schema(query=Query)
