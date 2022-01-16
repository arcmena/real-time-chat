import { PrismaClient } from '@prisma/client'
import { PubSub } from 'graphql-subscriptions'

const prisma = new PrismaClient()
const pubsub = new PubSub()

export const context = {
  prisma,
  pubsub
}

export default context
