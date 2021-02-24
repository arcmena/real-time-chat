const { gql } = require("apollo-server");

const schema = gql`
  type Message {
    id: ID!
    user: String!
    content: String!
    sentAt: String!
  }

  type Query {
    messages: [Message!]
  }

  type Mutation {
    sendMessage(user: String!, content: String!): ID!
  }

  type Subscription {
    messages: [Message!]
  }
`;

module.exports = schema;
