import Button from "../../ui/Button";
import Input from "../../ui/Input";

const MessageRow = ({ user, content, onSubmit, onChange }) => {
  return (
    <form className="send-message-row" onSubmit={onSubmit} onChange={onChange}>
      <Input
        placeholder="Your name"
        className="send-message-row__user"
        name="user"
        value={user}
      />
      <Input
        placeholder="Your message"
        className="send-message-row__message"
        name="content"
        value={content}
      />
      <Button className="send-message-row__button" type="submit">
        Send
      </Button>
    </form>
  );
};

export default MessageRow;
