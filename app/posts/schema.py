import graphene
from graphene_django.types import DjangoObjectType, ObjectType
from .models import Post, Comment, Tag, Image
from datetime import datetime
from django.utils import timezone


class PostType(DjangoObjectType):
    class Meta:
        model = Post

class CommentType(DjangoObjectType):
    class Meta:
        model = Comment

class TagType(DjangoObjectType):
    class Meta:
        model = Tag

class ImageType(DjangoObjectType):
    class Meta:
        model = Image

class Query(graphene.ObjectType):
    allposts = graphene.List(PostType)
    alltags = graphene.List(TagType)
    allimages = graphene.List(ImageType)
    post = graphene.Field(PostType, id=graphene.Int())
    comment = graphene.Field(CommentType, id=graphene.Int())

    # get all the blog post
    def resolve_allposts(self, info, **kwargs):
        return Post.objects.all()

    # get all the blog post
    def resolve_allposts(self, info, **kwargs):
        return Post.objects.all()

    # get all the blog post
    def resolve_allposts(self, info, **kwargs):
        return Post.objects.all()

    # Get the blog post by Blog ID
    def resolve_blogs(self, info, id):
        return Post.objects.get(pk=id)

    # Get the comments by Comment ID
    def resolve_comments(self, info, id):
        return Comment.objects.get(pk=id)


# Mutations
#  ------------------------

# Create New blog post
class CreateblogMutation(graphene.Mutation):
    createblogpost = graphene.Field(PostType)

    class Arguments:
        title = graphene.String()
        description = graphene.String()
        author = graphene.String()
        published_date = graphene.DateTime(default_value=timezone.now())

    def mutate(self, info, title, description, author, published_date):
        blog = Post.objects.create(title=title, description=description, author=author, published_date=timezone.now())
        blog.save()
        return CreateblogMutation(createblogpost=blog)


# Update existing blog post using blog ID..
class BlogupdateMutation(graphene.Mutation):
    blogupdate = graphene.Field(PostType)

    class Arguments:
        blog_id = graphene.Int(required=True)
        title = graphene.String()
        description = graphene.String()
        author = graphene.String()
        updated_at = graphene.DateTime(default_value=timezone.now())

    def mutate(self, info, blog_id, title, description, author, updated_at):
        updated_blogs = Post.objects.get(id=blog_id)
        updated_blogs.title = title
        updated_blogs.description = description
        updated_blogs.author = author
        updated_blogs.updated_at = updated_at

        updated_blogs.save()

        return BlogupdateMutation(blogupdate=updated_blogs)


# Create New Comment for Blog post
class CreatecommentMutation(graphene.Mutation):
    createcommentpost = graphene.Field(CommentType)

    class Arguments:
        comment = graphene.String()
        author = graphene.String()

    def mutate(self, info, author, comment, **kwargs):
        author = Post.objects.get(author=author)
        comments_create = Comment.objects.create(comment=comment, author=author)
        comments_create.save()
        return CreateblogMutation(comments_create)


# Delete Comments based on Comment ID..
class DeletecommentMutation(graphene.Mutation):
    comment_id = graphene.Int()

    class Arguments:
        comment_id = graphene.Int(required=True)

    def mutate(self, info, comment_id):
        comment = Comment.objects.get(id=comment_id)
        comment.delete()
        return DeletecommentMutation(comment_id=comment_id)


class Mutation(graphene.ObjectType):
    createBlog = CreateblogMutation.Field()
    updateblog = BlogupdateMutation.Field()
    createcomment = CreatecommentMutation.Field()
    deletecomment = DeletecommentMutation.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)