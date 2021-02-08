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

export { Query, Mutation };
