import { withFilter } from 'graphql-subscriptions'

import authRequired from '../../../permissions/authRequired'

import { SEND_MESSAGE } from '../../channels'

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
    createMessage: authRequired.createResolver(async (_, args, context) => {
      const { chatId, content } = args.data
      const { pubsub, prisma, user } = context

      const message = await prisma.message.create({
        data: {
          chatId,
          content,
          userId: user.id
        },
        include: {
          user: {
            select: {
              username: true
            }
          }
        }
      })

      pubsub.publish(SEND_MESSAGE, {
        newMessages: message
      })

      return true
    })
  },
  Subscription: {
    newMessages: {
      subscribe: authRequired.createResolver(
        // TODO: check if user is actually in the chat
        withFilter(
          (_payload, _args, context) => {
            const { pubsub } = context

            return pubsub.asyncIterator(SEND_MESSAGE)
          },
          (payload, args) => {
            const incomingMessageId = payload.newMessages.chatId
            const listeningChatId = args.data.chatId

            return listeningChatId === incomingMessageId
          }
        )
      )
    }
  }
}

export default resolvers
