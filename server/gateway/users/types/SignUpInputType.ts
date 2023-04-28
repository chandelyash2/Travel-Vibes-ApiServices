import {
  GraphQLEnumType,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql'

const roleType = new GraphQLEnumType({
  name: 'UserRoles',
  values: {
    USER: {
      value: 'user',
    },
    ADMIN: {
      value: 'admin',
    },
  },
})
const SignupInputType = new GraphQLInputObjectType({
  name: 'SignUpInput',
  fields: () => ({
    firstName: {
      type: new GraphQLNonNull(GraphQLString),
    },
    lastName: {
      type: new GraphQLNonNull(GraphQLString),
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
    dob: {
      type: new GraphQLNonNull(GraphQLString),
    },
    phoneNumber: {
      type: GraphQLString,
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
    },
    role: {
      type: new GraphQLNonNull(roleType),
    },
  }),
})
export default SignupInputType
