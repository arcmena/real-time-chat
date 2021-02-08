const { gql } = require("apollo-server");

const schema = gql`
  type Message {
    id: ID!
    user: String!
    content: String!
  }

  type Query {
    messages: [Message!]
  }

  type Mutation {
    sendMessage(user: String!, content: String!): ID!
  }
`;

module.exports = schema;
