import { useState } from "react";
import cn from "classnames";

import { useUI } from "../../../contexts/UIContext";

import { Button, Input } from "../../ui";

import s from "./AuthView.module.css";

const AuthView = () => {
  const [username, setUsername] = useState("");
  const [valid, setValid] = useState(false);

  const { setUser, closeModal } = useUI();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username) return;
    setUser(username);
    closeModal();
  };

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <h1>Hello there!</h1>
      <h2>To enter the chat you need to tell us your nickname :D</h2>
      <Input
        className={s.nickname}
        onChange={(e) => {
          const { value } = e.target;
          if (value === "") return setValid(false);
          setValid(true);
          setUsername(value);
        }}
        placeholder="Your badass nickname here"
        name="username"
        defaultValue={username}
      />
      <Button className={cn(s.submit, valid ? s.valid : s.invalid)}>
        Enter!
      </Button>
    </form>
  );
};

export default AuthView;
