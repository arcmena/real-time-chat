import { useState } from "react";
import cn from "classnames";

import SendIcon from "../../../assets/icons/send.svg";

import { Button, Input } from "../../ui";

import s from "./ChatFooter.module.css";

const ChatFooter = ({ content, onSubmit, onChange }) => {
  const [pressed, setPressed] = useState(false);

  const animate = () => {
    setPressed(true);
    setTimeout(() => {
      setPressed(false);
    }, 400);
  };

  return (
    <form className={s.root} onSubmit={onSubmit} onChange={onChange}>
      <Input
        className={s.message}
        placeholder="Send message"
        name="content"
        value={content}
      />
      <Button
        className={cn(s.send_button, pressed && s.animated)}
        onMouseDown={animate}
        type="submit"
      >
        <img src={SendIcon} alt="send" width="27" height="27" />
      </Button>
    </form>
  );
};

export default ChatFooter;
