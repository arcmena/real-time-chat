import { gql } from "apollo-server";

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
    sendMessage(user: String!, content: String!, sentAt: String!): ID!
  }

  type Subscription {
    messages: [Message!]
  }
`;

export default schema
