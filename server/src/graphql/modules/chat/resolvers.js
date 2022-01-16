import { withFilter } from 'graphql-subscriptions'

import { SEND_MESSAGE } from '../../channels'

const messages = []

const resolvers = {
  Query: {
    messages: () => messages
  },
  Mutation: {
    sendMessage: (_, { user, content, sentAt }, context) => {
      const { pubsub, user: userOnMutation } = context

      console.log({ userOnMutation })

      const id = messages.length
      messages.push({
        id,
        user,
        content,
        sentAt
      })

      pubsub.publish(SEND_MESSAGE, {
        messages
      })

      return id
    }
  },
  Subscription: {
    messages: {
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
