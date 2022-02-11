import { gql } from '@apollo/client'

export const ME_CHATS_QUERY = gql`
  query MeChats {
    me {
      id
      username
    }
    chats {
      id
      users {
        id
        username
      }
    }
  }
`
