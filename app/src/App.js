import "./App.css";

//Chat Client to provide the connection with the backend
import ChatClient from "./lib/ChatClient";

import { ChatView } from "./components/chat";

import s from "./App.module.css";

const App = () => {
  return (
    <ChatClient>
      <div className={s.wrapper}>
        <div className={s.title}>
          <h1>ArctiChat</h1>
        </div>
        <ChatView />
      </div>
    </ChatClient>
  );
};

export default App;
