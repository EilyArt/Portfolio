import graphene
from graphene_django import DjangoObjectType
from .models import Post, Tag


class PostType(DjangoObjectType):
    class Meta:
        model = Post
        fields = ("id", "title", "slug")

class Query(graphene.ObjectType):

    all_posts = graphene.List(PostType)

    def resolve_all_posts(root, info):
        return Post.objects.all()

schema = graphene.Schema(query=Query)