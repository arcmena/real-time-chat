import "./App.css";

//Chat Client to provide the connection with the backend
import ChatClient from "./lib/ChatClient";

import { ChatView } from "./components/chat";

const App = () => {
  return (
    <ChatClient>
      <ChatView />
    </ChatClient>
  );
};

export default App;
