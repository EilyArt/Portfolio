import graphene
from graphene_django.types import DjangoObjectType
from .models import *
from graphene.types.generic import GenericScalar
from django.shortcuts import get_object_or_404

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


class PostMetaType(DjangoObjectType):
    meta = GenericScalar()

    class Meta:
        model = PostMeta


class Query(graphene.ObjectType):

    # SECTION - POST


    # ANCHOR -  GET ALL POSTS
    allPosts = graphene.List(PostType)

    def resolve_allPosts(self, info, **kwargs):
        try:
            return Post.objects.order_by('-id').all()
        except Post.DoesNotExist:
            return None


    # ANCHOR -  GET POST BY SLUG
    post = graphene.Field(PostType, slug=graphene.String())

    def resolve_post(self, info, slug):
        try:
            return Post.objects.get(slug=slug)
        except Post.DoesNotExist:
            return None

    # ANCHOR -  GET POST BY SLUG
    lastNPosts = graphene.List(PostType, N=graphene.Int())

    def resolve_lastNPosts(self, info, N):
        try:
            return Post.objects.order_by('-id')[:N]
        except Post.DoesNotExist:
            return None


    # ANCHOR -  GET PREVIOUS/NEXT POSTS
    prevNextPosts = graphene.List(PostType, slug=graphene.String())

    def resolve_prevNextPosts(self, info, slug):
        try:
            post = Post.objects.get(slug=slug)
        except Post.DoesNotExist:
            return [None, None]
        try:
            prevPost = Post.objects.get(id=post.id - 1)
            nextPost = Post.objects.get(id=post.id + 1)
        except:
            try:
                prevPost = Post.objects.get(id=post.id - 1)
                nextPost = Post.objects.get(id=1)
            except:
                try:
                    prevPost = Post.objects.get(id=post.id + 2)
                    nextPost = Post.objects.get(id=post.id + 1)
                except:
                    [post, post]
        return [prevPost, nextPost]


    # ANCHOR -  GET ALL POSTS OF A TAG
    allTaggedPosts = graphene.List(PostType, tag=graphene.String())

    def resolve_allTaggedPosts(self, info, tag):
        try:
            tagObject = Tag.objects.get(name=tag)
            return Post.objects.all().filter(tags__in=[tagObject.id])
        except Post.DoesNotExist:
            return None


    # ANCHOR -  GET LAST 3 POSTS OF A TAG
    threeRelatedPosts = graphene.List(PostType, slug=graphene.String())

    def resolve_threeRelatedPosts(self, info, slug):
        try:
            post = Post.objects.get(slug=slug)
            return Post.objects.all().exclude(id__in=[o.id for o in [post]]).filter(tags__in=[int(p.id) for p in post.tags.all()]).order_by("-id")[:3]
        except Post.DoesNotExist:
            return None


    # ANCHOR -  GET POST BY SLUG
    tag = graphene.Field(TagType, name=graphene.String())

    def resolve_tag(self, info, slug):
        try:
            return Post.objects.get(slug=slug)
        except Post.DoesNotExist:
            return None

    # SECTION - COMMENT


    # ANCHOR -  GET ALL POST COMMENTS
    allComments = graphene.List(CommentType, slug=graphene.String())

    def resolve_allComments(self, info, slug):
        try:
            post = Post.objects.get(slug=slug)
            return Comment.objects.all().filter(parent__isnull=True, post=post.id)
        except Post.DoesNotExist:
            return None

    # SECTION - TAG


    # ANCHOR -  GET ALL TAGS
    allTags = graphene.List(TagType)

    def resolve_allTags(self, info, **kwargs):
        try:
            return Tag.objects.all()
        except Tag.DoesNotExist:
            return None


    # SECTION - POST META


    # ANCHOR -  GET ALL POST COMMENTS
    postMetas = graphene.List(PostMetaType, slug=graphene.String())

    def resolve_postMetas(self, info, slug):
        try:
            post = Post.objects.get(slug=slug)
            return PostMeta.objects.all().filter(post=post.id)
        except Post.DoesNotExist:
            return None

schema = graphene.Schema(query=Query)
