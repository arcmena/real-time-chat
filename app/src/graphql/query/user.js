import { gql } from '@apollo/client'

export const ME_QUERY = gql`
  query Me {
    me {
      id
      username
      chats {
        id
        users {
          id
          username
        }
        lastMessage {
          id
          content
          user {
            id
            username
          }
        }
      }
    }
  }
`
