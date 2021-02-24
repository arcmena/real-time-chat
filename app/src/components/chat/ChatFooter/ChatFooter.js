import { useState } from "react";
import cn from "classnames";

import SendIcon from "../../../assets/icons/send.svg";

import { Button, Input } from "../../ui";

import s from "./ChatFooter.module.css";

const ChatFooter = ({ content, onSubmit, onChange, focusOnBottomDiv }) => {
  const [pressed, setPressed] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const animate = () => {
    if (content === "") return;

    setPressed(true);

    setTimeout(() => {
      setPressed(false);
    }, 400);
  };

  return (
    <form
      className={cn(s.root, isFocused && s.focused)}
      onSubmit={onSubmit}
      onChange={onChange}
    >
      <Input
        className={s.message}
        placeholder="Send message"
        name="content"
        value={content}
        onFocus={() => {
          setIsFocused(true);

          setTimeout(() => {
            focusOnBottomDiv();
          }, 1000);
        }}
        onBlur={() => setIsFocused(false)}
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
