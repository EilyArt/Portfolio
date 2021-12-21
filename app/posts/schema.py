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
        except Tag.DoesNotExist:
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


    # ANCHOR -  GET TAG
    tag = graphene.Field(TagType, name=graphene.String())

    def resolve_tag(self, info, name):
        try:
            return Tag.objects.get(name=name)
        except Tag.DoesNotExist:
            return None


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


# ANCHOR - NEW COMMENT MUTATION
class CommentMutation(graphene.Mutation):
    class Arguments:
        # NOTE - The input arguments for this mutation
        post = graphene.Int(required=True)
        parent = graphene.Int(required=True)
        comment = graphene.String(required=True)
        username = graphene.String(required=True)
        email = graphene.String(required=True)

    # NOTE - The class attributes define the response of the mutation
    comment = graphene.Field(CommentType)
    post_object = graphene.Field(PostType)

    @classmethod
    def mutate(cls, root, info, comment, post, parent, username, email):
        request = info.context
        post_object = Post.objects.get(id=post)
        comment = Comment(comment=comment)
        try:
            x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
            if x_forwarded_for:
                ip = x_forwarded_for.split(',')[0]
            else:
                ip = request.META.get('REMOTE_ADDR')
            comment.ip_address = ip
            comment.post = post_object
            comment.username = username
            comment.email = email
            if parent == 0:
                comment.parent = None
            else:
                comment_parent = Comment.objects.get(id=parent)
                if comment_parent.post_id == post_object.id:
                    comment.parent = comment_parent
                else:
                    comment.parent = None
            comment.save()
        except:
            return 
        # NOTE - Notice we return an instance of this mutation
        return CommentMutation(comment=comment)


# ANCHOR - NEW COMMENT MUTATION
class LikeDislikeMutation(graphene.Mutation):
    class Arguments:
        # NOTE - The input arguments for this mutation
        like = graphene.Boolean(required=True)
        comment_id = graphene.Int(required=True)

    # NOTE - The class attributes define the response of the mutation
    comment = graphene.Field(CommentType)

    @classmethod
    def mutate(cls, root, info, comment_id, like):
        request = info.context
        try:
            comment = Comment.objects.get(id=comment_id)
            x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
            if x_forwarded_for:
                ip = x_forwarded_for.split(',')[0]
            else:
                ip = request.META.get('REMOTE_ADDR')

            if like and ip not in comment.likes:
                if ip in comment.dislikes:
                    comment.dislikes.remove(ip)
                comment.likes.append(ip)

            if not like and ip not in comment.dislikes:
                if ip in comment.likes:
                    comment.likes.remove(ip)
                comment.dislikes.append(ip)

            comment.save()
        except:
            return 
        # NOTE - Notice we return an instance of this mutation
        return LikeDislikeMutation(comment=comment)

# ANCHOR - NEW COMMENT MUTATION
class PostViewMutation(graphene.Mutation):
    class Arguments:
        # NOTE - The input arguments for this mutation
        post_id = graphene.Int(required=True)

    # NOTE - The class attributes define the response of the mutation
    post = graphene.Field(PostType)

    @classmethod
    def mutate(cls, root, info, post_id):
        request = info.context
        try:
            post = Post.objects.get(id=post_id)
            x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
            if x_forwarded_for:
                ip = x_forwarded_for.split(',')[0]
            else:
                ip = request.META.get('REMOTE_ADDR')

            if ip not in post.view:
                post.view.append(ip)
            post.save()
        except:
            return 
        # NOTE - Notice we return an instance of this mutation
        return PostViewMutation(post=post)

class Mutation(graphene.ObjectType):
    add_comment = CommentMutation.Field()
    comment_emotion = LikeDislikeMutation.Field()
    add_view = PostViewMutation.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)
