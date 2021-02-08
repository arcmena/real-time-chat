import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";

const link = new WebSocketLink({
  uri: `ws://localhost:4000/graphql`,
  options: {
    reconnect: true,
  },
});

const client = new ApolloClient({
  link,
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
});

const ChatClient = ({ children }) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
);

export default ChatClient;
