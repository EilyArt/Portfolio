import graphene
from graphene_django import DjangoObjectType
from .models import Post, Tag


class BooksType(DjangoObjectType):
    class Meta:
        model = Post
        fields = ("id", "title", "slug")

class Query(graphene.ObjectType):

    all_posts = graphene.List(BooksType)

    def resolve_all_posts(root, info):
        return Post.objects.filter(title="django")

schema = graphene.Schema(query=Query)