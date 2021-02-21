import s from "./Message.module.css";

const Message = ({ message: { user: messageUser, content }, user }) => {
  return (
    <div
      className={`${s.wrapper} ${
        user === messageUser ? s.flex_end : s.flex_start
      }`}
    >
      {user !== messageUser && (
        <div className={s.author}>{messageUser.slice(0, 2).toUpperCase()}</div>
      )}
      <div
        className={`${s.content} ${user === messageUser ? s.mine : s.not_mine}`}
      >
        {content}
      </div>
    </div>
  );
};

export default Message;
