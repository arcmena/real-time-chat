import { gql } from '@apollo/client'

export const CREATE_MESSAGE_MUTATION = gql`
  mutation CreateMessage($data: CreateMessageInput) {
    createMessage(data: $data)
  }
`

export const CREATE_CHAT_MUTATION = gql`
  mutation CreateChat($data: CreateChatInput) {
    createChat(data: $data) {
      errors {
        path
        message
      }
      ok
    }
  }
`
