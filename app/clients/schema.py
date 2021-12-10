import graphene
from graphene_django.types import DjangoObjectType
from .models import *
from graphene.types.generic import GenericScalar


class FollowerType(DjangoObjectType):
    meta = GenericScalar()

    class Meta:
        model = Follower



class FollowerMutation(graphene.Mutation):
    class Arguments:
        # NOTE - The input arguments for this mutation
        email = graphene.String(required=True)

    # NOTE - The class attributes define the response of the mutation
    follower = graphene.Field(FollowerType)

    @classmethod
    def mutate(cls, root, info, email):
        follower = Follower(email=email)
        follower.save()
        # NOTE - Notice we return an instance of this mutation
        return FollowerMutation(follower=follower)


class Mutation(graphene.ObjectType):
    create_follower = FollowerMutation.Field()


schema = graphene.Schema(query=Mutation)
