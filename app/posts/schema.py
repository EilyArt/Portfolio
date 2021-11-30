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
        return Comment.objects.all().filter(parent__isnull=True, post = post.id)

schema = graphene.Schema(query=Query)


# Mutations
#  ------------------------

# Create New blog post
# class CreatePost(graphene.Mutation):
#     Post = graphene.Field(PostType)

#     class Arguments:
#         title = graphene.String()
#         description = graphene.String()
#         author = graphene.String()
#         slug = graphene.String()
#         alt = graphene.String()

#     def mutate(self, info, request, title, description, slug, alt, src):
#         post = Post.objects.create(title=title, description=description, author=request.user, slug=slug, image=image.id)
#         post.save()
#         return CreatePost(Post=post)


# # Update existing blog post using blog ID..
# class UpdatePost(graphene.Mutation):
#     Post = graphene.Field(PostType)

#     class Arguments:
#         blog_id = graphene.Int(required=True)
#         title = graphene.String()
#         description = graphene.String()
#         author = graphene.String()
#         updated_at = graphene.DateTime(default_value=timezone.now())

#     def mutate(self, info, blog_id, title, description, author, updated_at):
#         updated_blogs = Post.objects.get(id=blog_id)
#         updated_blogs.title = title
#         updated_blogs.description = description
#         updated_blogs.author = author
#         updated_blogs.updated_at = updated_at

#         updated_blogs.save()

#         return UpdatePost(Post=updated_blogs)


# # Create New Comment for Blog post
# class CreatecommentMutation(graphene.Mutation):
#     createcommentpost = graphene.Field(CommentType)

#     class Arguments:
#         comment = graphene.String()
#         author = graphene.String()

#     def mutate(self, info, author, comment, **kwargs):
#         author = Post.objects.get(author=author)
#         comments_create = Comment.objects.create(comment=comment, author=author)
#         comments_create.save()
#         return CreatePost(comments_create)


# # Delete Comments based on Comment ID..
# class DeletecommentMutation(graphene.Mutation):
#     comment_id = graphene.Int()

#     class Arguments:
#         comment_id = graphene.Int(required=True)

#     def mutate(self, info, comment_id):
#         comment = Comment.objects.get(id=comment_id)
#         comment.delete()
#         return DeletecommentMutation(comment_id=comment_id)


# class Mutation(graphene.ObjectType):
#     createPost = CreatePost.Field()
#     updatePost = UpdatePost.Field()
#     createcomment = CreatecommentMutation.Field()
#     deletecomment = DeletecommentMutation.Field()


# schema = graphene.Schema(query=Query, mutation=Mutation)