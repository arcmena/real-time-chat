const { gql } = require('@apollo/client')

export const NEW_MESSAGE_SUBSCRIPTION = gql`
  subscription NewMessage($data: NewMessageInput) {
    newMessage(data: $data) {
      id
      content
      createdAt
      user {
        id
        username
      }
    }
  }
`

export const NEW_CHAT_SUBSCRIPTION = gql`
  subscription NewChat {
    newChat {
      id
      users {
        id
        username
      }
    }
  }
`
