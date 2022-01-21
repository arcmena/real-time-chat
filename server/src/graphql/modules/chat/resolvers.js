import { withFilter } from 'graphql-subscriptions'

import authRequired from 'permissions/authRequired'

import { SEND_MESSAGE } from 'graphql/channels'

import { containUser } from './utils'

const resolvers = {
  Query: {
    messages: authRequired(async (_parent, args, context) => {
      const { chatId } = args.data
      const { user, prisma } = context

      const chat = await prisma.chat.findUnique({
        where: {
          id: chatId
        },
        include: {
          users: {
            select: {
              id: true,
              username: true
            }
          },
          messages: {
            include: {
              user: true
            }
          }
        }
      })

      if (!chat) {
        return {
          errors: [
            { path: 'chatId', message: 'Not chat found with provided id' }
          ]
        }
      }

      if (!containUser(user.id, chat.users)) {
        return {
          errors: [{ path: 'chatId', message: 'Not allowed to view chat' }]
        }
      }

      return chat
    })
  },
  Mutation: {
    createChat: authRequired(async (_parent, args, context) => {
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
    createMessage: authRequired(async (_, args, context) => {
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
      subscribe: authRequired(
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
