import { useEffect, useState } from "react";
import Message from "../Message";

import s from "./Messages.module.css";

const Messages = ({ messages, user, bottomRef }) => {
  const [height, setHeight] = useState(window.innerHeight);

  const updateDimensions = () => {
      setHeight(window.innerHeight);
  }

  useEffect(() => {
      window.addEventListener("resize", updateDimensions);
      return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  return (
    <div className={s.wrapper} style={{ maxHeight: height - 192 }}>
      <div className={s.container}>
        {messages.map((item) => (
          <Message message={item} key={item.id} user={user} />
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  );
};

export default Messages;
