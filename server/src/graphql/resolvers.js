const { PubSub } = require("graphql-subscriptions");

const { SEND_MESSAGE } = require("./channels");

const pubsub = new PubSub();

const messages = [];

const resolvers = {
  Query: {
    messages: () => messages,
  },
  Mutation: {
    sendMessage: (_, { user, content, sentAt }) => {
      const id = messages.length;
      messages.push({
        id,
        user,
        content,
        sentAt,
      });

      pubsub.publish(SEND_MESSAGE, {
        messages,
      });

      return id;
    },
  },
  Subscription: {
    messages: {
      subscribe: (_, args) => {
        setTimeout(
          () =>
            pubsub.publish(SEND_MESSAGE, {
              messages,
            }),
          0
        );
        return pubsub.asyncIterator(SEND_MESSAGE);
      },
    },
  },
};

module.exports = resolvers;
