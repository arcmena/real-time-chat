import cn from "classnames";
import s from "./Message.module.css";

const Message = ({ message: { user: messageUser, content }, user }) => {
  return (
    <div
      className={cn(
        s.wrapper,
        user === messageUser ? s.flex_end : s.flex_start
      )}
    >
      {user !== messageUser && (
        <span className={s.author}>{messageUser.toUpperCase()}</span>
      )}
      <div
        className={cn(s.content, user === messageUser ? s.mine : s.not_mine)}
      >
        {content}
      </div>
    </div>
  );
};

export default Message;
