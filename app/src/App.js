import "./App.css";

//Chat Client to provide the connection with the backend
import ChatClient from "./lib/ChatClient";

import { ChatView } from "./components/chat";
import { Header } from "./components/common";

import s from "./App.module.css";

const App = () => {
  return (
    <ChatClient>
      <div className={s.wrapper}>
        <Header />
        <ChatView />
      </div>
    </ChatClient>
  );
};

export default App;
