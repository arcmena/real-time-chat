import { gql } from '@apollo/client'

export const MESSAGES_QUERY = gql`
  query Messages($data: MessagesInput) {
    messages(data: $data) {
      chat {
        id
        users {
          id
          username
        }
        messages {
          id
          content
          createdAt
          user {
            id
            username
          }
        }
      }
      errors {
        path
        message
      }
    }
  }
`
