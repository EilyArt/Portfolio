import graphene
import posts.schema as posts
import projects.schema as projects
import about.schema as about
import pages.schema as pages

# Query for getting the data from the server.
class Query(posts.schema.Query, projects.schema.Query, about.schema.Query, pages.schema.Query, graphene.ObjectType):
    pass


# Create schema
schema = graphene.Schema(query=Query)