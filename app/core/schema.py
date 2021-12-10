import graphene
import posts.schema as posts
import projects.schema as projects
import about.schema as about
import pages.schema as pages
import clients.schema as clients

# Query for getting the data from the server.
class Query(posts.schema.Query, projects.schema.Query, about.schema.Query, pages.schema.Query, graphene.ObjectType):
    pass

# Query for getting the data from the server.
class Mutation(clients.schema.Mutation):
    pass


# Create schema
schema = graphene.Schema(query=Query, mutation=Mutation)