const { SEND_MESSAGE } = require("./channels");

const messages = [];

const resolvers = {
  Query: {
    messages: () => messages,
  },
  Mutation: {
    sendMessage: (_, { user, content }, { pubsub }) => {
      const id = messages.length;
      messages.push({
        id,
        user,
        content,
      });

      pubsub.publish(SEND_MESSAGE, {
        messages,
      });

      return id;
    },
  },
  Subscription: {
    messages: {
      subscribe: (_, args, { pubsub }) => pubsub.asyncIterator(SEND_MESSAGE),
    },
  },
};

module.exports = resolvers;
