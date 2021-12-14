import graphene
from graphene_django.types import DjangoObjectType
from .models import *
from graphene.types.generic import GenericScalar
from django.core.exceptions import ValidationError
from django.core.validators import validate_email


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
        request = info.context
        try:
            validate_email(email)
            follower = Follower(email=email)
            x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
            if x_forwarded_for:
                ip = x_forwarded_for.split(',')[0]
            else:
                ip = request.META.get('REMOTE_ADDR')
            follower.ip = ip
            follower.save()
        except ValidationError as e:
            return e
        # NOTE - Notice we return an instance of this mutation
        return FollowerMutation(follower=follower)


class Mutation(graphene.ObjectType):
    create_follower = FollowerMutation.Field()


schema = graphene.Schema(query=Mutation)
