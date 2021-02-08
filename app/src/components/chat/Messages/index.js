import Message from "../Message";

const Messages = ({ messages, user }) => {
  return (
    <>
      {messages.map((item) => (
        <Message message={item} key={item.id} user={user} />
      ))}
    </>
  );
};

export default Messages;
