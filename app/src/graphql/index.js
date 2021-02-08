import { gql } from "@apollo/client";

const Query = {
  GET_MESSAGES: gql`
    query {
      messages {
        id
        user
        content
      }
    }
  `,
};

const Mutation = {
  SEND_MESSAGE: gql`
    mutation($user: String!, $content: String!) {
      sendMessage(user: $user, content: $content)
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
      }
    }
  `,
};

export { Query, Mutation, Subscription };
