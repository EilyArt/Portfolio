import graphene
import posts.schema as posts
import projects.schema as projects
import about.schema as about

# Query for getting the data from the server.
class Query(posts.schema.Query, projects.schema.Query, about.schema.Query, graphene.ObjectType):
    pass


# Create schema
schema = graphene.Schema(query=Query)