import './init-aliases'
import express from 'express'
import initializeApolloServer from './initGraphQLServer'
import cors from 'cors'
import { json } from 'body-parser'
import { expressMiddleware } from '@apollo/server/express4'
import { config } from 'dotenv'
import { BaseContext } from '@apollo/server'
import sqlConnection from './database'
import { parseJwt } from './gateway/users/authJWT'
import { ResolverCtx } from './gateway/types'

export type Context = BaseContext & {
  user
}
const context = async ({ req, res }): Promise<ResolverCtx> => {
  parseJwt(req)

  return {
    req,
    res,
    user: req.user,
  }
}
const init = async () => {
  const app: express.Application = express()
  const PORT = 8080
  config()
  app.listen(PORT, async () => {
    sqlConnection()
    const apolloServer = initializeApolloServer()
    await apolloServer.start()
    app.use(
      '/graphql',
      cors<cors.CorsRequest>(),
      json(),
      expressMiddleware(apolloServer, { context }),
    )
    console.log(
      `🚀 Query endpoint ready at http://localhost:${PORT}/graphql \n`,
    )
  })
}
init()
