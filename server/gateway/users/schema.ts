import { GraphQLNonNull } from 'graphql'
import { User } from './types/UserType'
import SignupResolver from './resolvers/SignupResolver'
import SignupInputType from './types/SignUpInputType'
import UserPayloadType from './types/UserPayload'
import MeResolver from './resolvers/MeResolver'
import AuthInput from './types/AuthInput'
import authResolver from './resolvers/authResolver'
import isAuthenticated from '../shield/isAuthenticated'
import { allow } from 'graphql-shield'

export const userQuery = {
  me: {
    type: User,
    resolve: MeResolver,
  },
}
export const userMutation = {
  signup: {
    type: new GraphQLNonNull(UserPayloadType),
    args: {
      input: {
        type: new GraphQLNonNull(SignupInputType),
      },
    },
    resolve: SignupResolver,
  },
  authUser: {
    type: new GraphQLNonNull(UserPayloadType),
    args: {
      input: {
        type: new GraphQLNonNull(AuthInput),
      },
    },
    resolve: authResolver,
  },
}

export const userPermission = {
  Query: {
    me: isAuthenticated,
  },
  Mutation: {
    authUser: allow,
  },
}
