import Message from "../Message";

import s from "./Messages.module.css";

const Messages = ({ messages, user }) => {
  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        {messages.map((item) => (
          <Message message={item} key={item.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default Messages;
