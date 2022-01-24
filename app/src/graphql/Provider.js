import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { WebSocketLink } from '@apollo/client/link/ws'
import { setContext } from '@apollo/client/link/context'
import { split, HttpLink } from '@apollo/client'

import { getMainDefinition } from '@apollo/client/utilities'

import authStorage from '../lib/authStorage'

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_GRAPHQL_SCHEMA
})

const wsLink = new WebSocketLink({
  uri: process.env.REACT_APP_GRAPHQL_WS,
  options: {
    reconnect: true,
    lazy: true,
    connectionParams: {
      Authorization: `Bearer ${authStorage.getToken()}`
    }
  }
})

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  httpLink
)

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = authStorage.getToken()
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(splitLink),
  cache: new InMemoryCache(),
  connectToDevTools: true
})

const Provider = ({ children }) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
)

export default Provider
