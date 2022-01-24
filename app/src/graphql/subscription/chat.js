const { gql } = require('@apollo/client')

export const NEW_MESSAGES_SUBSCRIPTION = gql`
  subscription NewMessages($data: NewMessageInput) {
    newMessages(data: $data) {
      id
      user {
        username
      }
      content
      createdAt
    }
  }
`
