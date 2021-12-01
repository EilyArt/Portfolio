import graphene
import posts.schema as posts
import projects.schema as projects

# Query for getting the data from the server.
class Query(posts.schema.Query, projects.schema.Query, graphene.ObjectType):
    pass


# Create schema
schema = graphene.Schema(query=Query)