import { useState } from "react";
import { useSubscription, useMutation } from "@apollo/client";

import { Subscription, Mutation } from "../../../graphql";

import { useUI } from "../../../contexts/UIContext";

import Messages from "../Messages";
import ChatFooter from "../ChatFooter";

import s from "./ChatView.module.css";

const ChatView = () => {
  const { data } = useSubscription(Subscription.SUBSCRIBE_MESSAGES);
  const [sendMessage] = useMutation(Mutation.SEND_MESSAGE);

  const { user } = useUI();

  const [formValues, setFormValues] = useState({
    content: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formValues.content === "") return;

    sendMessage({
      variables: {
        user,
        content: formValues.content,
      },
    });

    formValues.content = "";
  };

  if (!data)
    return (
      <div className={s.root}>
        <h1>Oops, something went wrong</h1>
      </div>
    );

  return (
    <div className={s.root}>
      <Messages messages={data.messages} user={user} />
      <ChatFooter
        user={user}
        content={formValues.content}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default ChatView;
