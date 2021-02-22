import { Button, Input } from "../../ui";

import SendIcon from "../../../assets/icons/send.svg";

import s from "./ChatFooter.module.css";

const ChatFooter = ({ content, onSubmit, onChange }) => {
  return (
    <form className={s.root} onSubmit={onSubmit} onChange={onChange}>
      <Input
        className={s.message}
        placeholder="Send message"
        name="content"
        defaultValue={content}
      />
      <Button className={s.send_button} type="submit">
        <img src={SendIcon} alt="send" width="27" height="27" />
      </Button>
    </form>
  );
};

export default ChatFooter;
