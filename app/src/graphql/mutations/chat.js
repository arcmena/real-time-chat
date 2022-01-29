import { gql } from '@apollo/client'

export const CREATE_MESSAGE_MUTATION = gql`
  mutation CreateMessage($data: CreateMessageInput) {
    createMessage(data: $data)
  }
`
