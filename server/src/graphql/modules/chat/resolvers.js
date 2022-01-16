import { withFilter } from 'graphql-subscriptions'

import authRequired from '../../../permissions/authRequired'

import { SEND_MESSAGE } from '../../channels'

const messages = []

const resolvers = {
  Query: {
    messages: (_parent, _args, context) => {
      const { prisma } = context

      return prisma
    }
  },
  Mutation: {
    createChat: authRequired.createResolver(async (_parent, args, context) => {
      const { otherUsername } = args.data
      const { user, prisma } = context

      const otherUser = await prisma.user.findUnique({
        where: { username: otherUsername }
      })

      if (!otherUser) {
        return {
          errors: [{ path: 'otherUsername', message: 'Other user not found' }]
        }
      }

      // TODO: check if the user already has a chat with the otherUser
      // if it does have, don't allow to create a new one

      const chat = await prisma.chat.create({
        data: {
          users: {
            connect: [{ id: user.id }, { id: otherUser.id }]
          }
        },
        include: {
          users: true,
          messages: true
        }
      })

      return {
        chat
      }
    }),
    createMessage: (_, { user, content, sentAt }, context) => {
      const { pubsub, user: userOnMutation } = context

      console.log({ userOnMutation })

      const id = messages.length

      pubsub.publish(SEND_MESSAGE, {
        newMessages: messages
      })

      return id
    }
  },
  Subscription: {
    newMessages: {
      subscribe: withFilter(
        (_payload, _args, context) => {
          const { pubsub } = context

          return pubsub.asyncIterator(SEND_MESSAGE)
        },
        (payload, args, context) => {
          const { user } = context

          console.log({ userOnSubscription: user })
        }
      )
    }
  }
}

export default resolvers
