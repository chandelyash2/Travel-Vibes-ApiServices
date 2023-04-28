import { GraphQLObjectType, GraphQLSchema } from 'graphql'
import { userMutation, userPermission, userQuery } from './gateway/users/schema'
import { shield } from 'graphql-shield'
import { applyMiddleware } from 'graphql-middleware'

const query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    ...userQuery,
  },
})

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    ...userMutation,
  },
})
const schema = new GraphQLSchema({
  query,
  mutation,
})
export const permissions = shield({
  Query: {
    ...userPermission.Query,
  },
  Mutation: {
    ...userPermission.Mutation,
  },
})

export default applyMiddleware(schema, permissions)
