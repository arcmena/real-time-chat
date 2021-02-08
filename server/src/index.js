const { ApolloServer, PubSub } = require("apollo-server");

const typeDefs = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");

const pubsub = new PubSub();

const server = new ApolloServer({ typeDefs, resolvers, context: { pubsub } });

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
