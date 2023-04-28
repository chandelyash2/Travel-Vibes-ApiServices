import { GraphQLObjectType, GraphQLString } from 'graphql'
import { User } from './UserType'
import ErrorType from './ErrorType'

const UserPayloadType = new GraphQLObjectType({
  name: 'UserPayloadType',
  fields: () => ({
    user: {
      type: User,
    },
    token: {
      type: GraphQLString,
    },
    error: {
      type: ErrorType,
    },
  }),
})
export default UserPayloadType
