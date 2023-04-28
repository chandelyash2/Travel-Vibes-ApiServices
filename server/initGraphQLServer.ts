import { ApolloServer } from '@apollo/server'
import schema from './schema'

const initializeApolloServer = () => {
  const enablePlayground = process.env.DEBUG === 'true'
  const server = new ApolloServer({
    schema,
    introspection: enablePlayground,
  })
  return server
}
export default initializeApolloServer
