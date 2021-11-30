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
    allPosts = graphene.List(PostType)
    post = graphene.Field(PostType, slug=graphene.String())
    lastNPosts = graphene.List(PostType, N=graphene.Int())
    allTaggedPosts = graphene.List(PostType, tag=graphene.String())
    allTags = graphene.List(TagType)
    tag = graphene.Field(TagType, name=graphene.String())
    allComments = graphene.List(CommentType, slug=graphene.String())

    # ANCHOR -  GET ALL POSTS
    def resolve_allPosts(self, info, **kwargs):
        return Post.objects.all()

    # ANCHOR -  GET POST BY SLUG
    def resolve_post(self, info, slug):
        return Post.objects.get(slug=slug)

    # ANCHOR -  GET POST BY SLUG
    def resolve_lastNPosts(self, info, N):
        return Post.objects.order_by('-id')[:N]

    # ANCHOR -  GET ALL POSTS OF A TAG
    def resolve_allTaggedPosts(self, info, tag):
        tagObject = Tag.objects.get(name=tag)
        return Post.objects.all().filter(tags__in=[tagObject.id])

    # ANCHOR -  GET ALL TAGS
    def resolve_allTags(self, info, **kwargs):
        return Tag.objects.all()

    # ANCHOR -  GET POST BY SLUG
    def resolve_tag(self, info, slug):
        return Post.objects.get(slug=slug)

    # ANCHOR -  GET ALL POSTS
    def resolve_allComments(self, info, slug):
        post = Post.objects.get(slug=slug)
        return Comment.objects.all().filter(parent__isnull=True, post=post.id)


schema = graphene.Schema(query=Query)