import { gql } from '@apollo/client'

export const LOGIN_MUTATION = gql`
  mutation Login($data: LoginInput) {
    login(data: $data) {
      token
      errors {
        path
        message
      }
    }
  }
`

export const CREATE_USER_MUTATION = gql`
  mutation CreateUser($data: CreateUserInput) {
    createUser(data: $data) {
      username
    }
  }
`
