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
          user {
            id
            username
          }
          content
          createdAt
        }
      }
      errors {
        path
        message
      }
    }
  }
`
