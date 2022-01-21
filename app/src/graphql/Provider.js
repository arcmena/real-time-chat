import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { WebSocketLink } from '@apollo/client/link/ws'

import { split, HttpLink } from '@apollo/client'
import { getMainDefinition } from '@apollo/client/utilities'

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_GRAPHQL_SCHEMA
})

const wsLink = new WebSocketLink({
  uri: process.env.REACT_APP_GRAPHQL_WS,
  options: {
    reconnect: true,
    lazy: true,
    connectionParams: {
      authorization: ''
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

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
  connectToDevTools: true
})

const Provider = ({ children }) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
)

export default Provider
