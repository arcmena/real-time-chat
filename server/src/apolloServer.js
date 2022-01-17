import { createServer } from 'http'
import { SubscriptionServer } from 'subscriptions-transport-ws'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { execute, subscribe } from 'graphql'
import { ApolloServer } from 'apollo-server-express'

import resolvers from 'graphql/resolvers'
import typeDefs from 'graphql/typeDefs'
import context from 'graphql/context'

import getUserFromToken from 'auth/getUserFromToken'

import { GRAPHQL_ENDPOINT } from 'constants/serverConstants'

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

const createApolloServer = app => {
  const httpServer = createServer(app)

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

  return {
    server,
    httpServer
  }
}

const startApolloServer = async (app, port) => {
  const { server, httpServer } = createApolloServer(app)

  await server.start()

  server.applyMiddleware({ app })

  httpServer.listen({ port })

  return server
}

export { startApolloServer }
