import { useState } from "react";
import { useSubscription, useMutation } from "@apollo/client";

import s from "./ChatView.module.css";

import { Subscription, Mutation } from "../../../graphql";

import Messages from "../Messages";
import ChatFooter from "../ChatFooter";

const ChatView = () => {
  const { data } = useSubscription(Subscription.SUBSCRIBE_MESSAGES);

  const [sendMessage] = useMutation(Mutation.SEND_MESSAGE);

  const [formValues, setFormValues] = useState({
    user: "Arcmena",
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
      variables: formValues,
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
      <Messages messages={data.messages} user={formValues.user} />
      <ChatFooter
        user={formValues.user}
        content={formValues.content}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default ChatView;
