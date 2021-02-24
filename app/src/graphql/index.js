import { gql } from "@apollo/client";

const Query = {
  GET_MESSAGES: gql`
    query {
      messages {
        id
        user
        content
        sentAt
      }
    }
  `,
};

const Mutation = {
  SEND_MESSAGE: gql`
    mutation($user: String!, $content: String!, $sentAt: String!) {
      sendMessage(user: $user, content: $content, sentAt: $sentAt)
    }
  `,
};

const Subscription = {
  SUBSCRIBE_MESSAGES: gql`
    subscription {
      messages {
        id
        user
        content
        sentAt
      }
    }
  `,
};

export { Query, Mutation, Subscription };
