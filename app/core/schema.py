# import app.posts.schema as post
# import graphene
# import app.pages.schema as page
#
#
# class Query(post.schema.Query, page.schema.Query, graphene.ObjectType):
#     pass
#
#
# class Mutation(page.schema.Mutation, graphene.ObjectType):
#     pass
#
#
# schema = graphene.Schema(query=Query, mutation=Mutation)