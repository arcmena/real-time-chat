//Chat Client to provide the connection with the backend
import ChatClient from "./lib/ChatClient";

import { ChatView } from "./components/chat";
import { Layout } from "./components/common";

const App = () => {
  return (
    <ChatClient>
      <Layout>
        <ChatView />
      </Layout>
    </ChatClient>
  );
};

export default App;
