const { SEND_MESSAGE } = require("./channels");

const messages = [];

const resolvers = {
  Query: {
    messages: () => messages,
  },
  Mutation: {
    sendMessage: (_, { user, content, sentAt }, { pubsub }) => {
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
      subscribe: (_, args, { pubsub }) => {
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
