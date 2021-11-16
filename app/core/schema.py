import graphene
import app.posts.schema

# Query for getting the data from the server.
class Query(app.posts.schema.Query, graphene.ObjectType):
    pass

# Mutation for Updating server data's
class Mutation(app.posts.schema.Mutation, graphene.ObjectType):
    pass

# Create schema
schema = graphene.Schema(query=Query, mutation=Mutation)