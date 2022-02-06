import { withFilter } from 'graphql-subscriptions'

import authRequired from 'permissions/authRequired'

import { CREATE_CHAT, SEND_MESSAGE } from 'graphql/channels'

import { containUser } from './utils'

const resolvers = {
  Query: {
    chats: authRequired(async (_parent, _args, context) => {
      const { prisma, user } = context

      const userChats = await prisma.chat.findMany({
        where: {
          users: {
            some: {
              id: user.id
            }
          }
        },
        include: {
          users: true,
          messages: {
            take: 1,
            include: { user: true },
            orderBy: { id: 'desc' }
          }
        }
      })

      return userChats
    }),
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

      return { chat }
    })
  },
  Mutation: {
    createChat: authRequired(async (_parent, args, context) => {
      const { otherUsername } = args.data
      const { user, prisma, pubsub } = context

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

      pubsub.publish(CREATE_CHAT, {
        newChat: chat
      })

      return {
        ok: true
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
              id: true,
              username: true
            }
          }
        }
      })

      pubsub.publish(SEND_MESSAGE, {
        newMessage: message
      })

      return true
    })
  },
  Subscription: {
    newMessage: {
      subscribe: authRequired(
        // TODO: check if user is actually in the chat
        withFilter(
          (_payload, _args, context) => {
            const { pubsub } = context

            return pubsub.asyncIterator(SEND_MESSAGE)
          },
          (payload, args) => {
            const incomingMessageChatId = payload.newMessage.chatId
            const listeningChatId = args.data.chatId

            return listeningChatId === incomingMessageChatId
          }
        )
      )
    },
    newChat: {
      subscribe: authRequired(
        withFilter(
          (_payload, _args, context) => {
            const { pubsub } = context

            return pubsub.asyncIterator(CREATE_CHAT)
          },
          (payload, args, context) => {
            const { user } = context
            const incomingChatUsers = payload.newChat.users

            return !!incomingChatUsers.find(({ id }) => id === user.id)
          }
        )
      )
    }
  }
}

export default resolvers
