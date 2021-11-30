import graphene
from graphene_django.types import DjangoObjectType, ObjectType
from .models import *
from datetime import datetime
from django.utils import timezone
from graphene.types.generic import GenericScalar


class PostType(DjangoObjectType):
    meta = GenericScalar()

    class Meta:
        model = Post


class TagType(DjangoObjectType):
    meta = GenericScalar()

    class Meta:
        model = Tag


class CommentType(DjangoObjectType):
    meta = GenericScalar()

    class Meta:
        model = Comment


class Query(graphene.ObjectType):

    # ANCHOR -  GET ALL POSTS
    allPosts = graphene.List(PostType)
    def resolve_allPosts(self, info, **kwargs):
        return Post.objects.all()

    # ANCHOR -  GET POST BY SLUG
    post = graphene.Field(PostType, slug=graphene.String())
    def resolve_post(self, info, slug):
        return Post.objects.get(slug=slug)

    # ANCHOR -  GET POST BY SLUG
    lastNPosts = graphene.List(PostType, N=graphene.Int())
    def resolve_lastNPosts(self, info, N):
        return Post.objects.order_by('-id')[:N]

    # ANCHOR -  GET ALL POSTS OF A TAG
    allTaggedPosts = graphene.List(PostType, tag=graphene.String())
    def resolve_allTaggedPosts(self, info, tag):
        tagObject = Tag.objects.get(name=tag)
        return Post.objects.all().filter(tags__in=[tagObject.id])

    # ANCHOR -  GET ALL TAGS
    allTags = graphene.List(TagType)
    def resolve_allTags(self, info, **kwargs):
        return Tag.objects.all()

    # ANCHOR -  GET POST BY SLUG
    tag = graphene.Field(TagType, name=graphene.String())
    def resolve_tag(self, info, slug):
        return Post.objects.get(slug=slug)

    # ANCHOR -  GET ALL POSTS
    allComments = graphene.List(CommentType, slug=graphene.String())
    def resolve_allComments(self, info, slug):
        post = Post.objects.get(slug=slug)
        return Comment.objects.all().filter(parent__isnull=True, post=post.id)


schema = graphene.Schema(query=Query)