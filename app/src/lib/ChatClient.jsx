import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";

const link = new WebSocketLink({
  uri: process.env.REACT_APP_GRAPHQL_WS,
  options: {
    reconnect: true,
  },
});

const client = new ApolloClient({
  link,
  uri: process.env.REACT_APP_GRAPHQL_SCHEMA,
  cache: new InMemoryCache(),
});

const ChatClient = ({ children }) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
);

export default ChatClient;
