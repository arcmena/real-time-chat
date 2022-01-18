import express from 'express'
import cors from 'cors'

import auth from 'auth/middleware'

import { startApolloServer } from 'apolloServer'

const app = express()

app.use(cors())

app.use(auth)

const PORT = 4000

const main = async () => {
  try {
    const server = await startApolloServer(app, PORT)

    console.log(
      `🚀 Query endpoint ready at http://localhost:${PORT}${server.graphqlPath}`
    )
    console.log(
      `🌌 Subscription endpoint ready at ws://localhost:${PORT}${server.subscriptionPath}`
    )
  } catch (error) {
    console.error(error)
  }
}

main()
