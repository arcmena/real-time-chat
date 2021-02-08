const Message = ({ message: { user: messageUser, content }, user }) => {
  return (
    <div
      className={`message ${
        user === messageUser ? "message__flex-end" : "message__flex-start"
      }`}
    >
      {user !== messageUser && (
        <div className="message__author">
          {messageUser.slice(0, 2).toUpperCase()}
        </div>
      )}
      <div
        className={`message__content ${
          user === messageUser
            ? "message__content-mine"
            : "message__content-not-mine"
        }`}
      >
        {content}
      </div>
    </div>
  );
};

export default Message;
