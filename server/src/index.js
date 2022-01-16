import { createServer } from 'http'
import { execute, subscribe } from 'graphql'
import { SubscriptionServer } from 'subscriptions-transport-ws'
import { makeExecutableSchema } from '@graphql-tools/schema'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import cors from 'cors'

import resolvers from './graphql/resolvers'
import typeDefs from './graphql/typeDefs'
import context from './graphql/context'

import getUserFromToken from './auth/getUserFromToken'

import { GRAPHQL_ENDPOINT } from './constants/serverConstants'

function auth(req, _res, next) {
  const { authorization } = req.headers

  if (authorization) {
    const [_bearer, token] = authorization.split(' ')

    if (token) {
      try {
        const user = getUserFromToken(token)
        req.user = user
      } catch (error) {
        // TODO: add refresh token logic
      }
    }
  }

  next()
}

//
;(async () => {
  const app = express()

  const httpServer = createServer(app)

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers
  })

  const subscriptionServer = SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe,
      onConnect: connectionParams => {
        const { Authorization } = connectionParams

        if (Authorization) {
          const [_bearer, token] = Authorization.split(' ')

          if (token) {
            try {
              const user = getUserFromToken(token)
              return { user }
            } catch (error) {
              // TODO: add refresh token logic
            }
          }
        }

        throw new Error('Missing auth token!')
      },
      onOperation: (_message, params) => ({
        ...params,
        context: {
          ...params.context,
          ...context
        }
      })
    },
    { server: httpServer, path: GRAPHQL_ENDPOINT }
  )

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({
      ...context,
      user: req.user
    }),
    plugins: [
      {
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close()
            }
          }
        }
      }
    ]
  })

  app.use(cors())
  app.use(auth)

  await server.start()

  server.applyMiddleware({ app })

  const PORT = 4000

  httpServer.listen(PORT, () => {
    console.log(
      `🚀 Query endpoint ready at http://localhost:${PORT}${server.graphqlPath}`
    )
    console.log(
      `🚀 Subscription endpoint ready at ws://localhost:${PORT}${server.graphqlPath}`
    )
  })
})()
