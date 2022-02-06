import { PubSub } from 'graphql-subscriptions'

import prismaClient from 'prismaClient'

const prisma = prismaClient
const pubsub = new PubSub()

export const context = {
  prisma,
  pubsub
}

export default context
