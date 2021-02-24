import { useRef, useState, useEffect } from "react";
import { useSubscription, useMutation } from "@apollo/client";

import { Subscription, Mutation } from "../../../graphql";

import { useUI } from "../../../contexts/UIContext";

import Messages from "../Messages";
import ChatFooter from "../ChatFooter";

const ChatView = () => {
  const { data } = useSubscription(Subscription.SUBSCRIBE_MESSAGES);
  const [sendMessage] = useMutation(Mutation.SEND_MESSAGE);

  const { user } = useUI();

  const bottomRef = useRef(null);

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

  const focusOnBottomDiv = () =>
    bottomRef.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });

  useEffect(() => {
    if (bottomRef.current !== null) focusOnBottomDiv();
  }, [data]);

  if (!data)
    return (
      <>
        <h1>Oops, something went wrong</h1>
      </>
    );

  return (
    <>
      <Messages messages={data.messages} user={user} bottomRef={bottomRef} />
      <ChatFooter
        user={user}
        content={formValues.content}
        onChange={handleChange}
        onSubmit={handleSubmit}
        focusOnBottomDiv={focusOnBottomDiv}
      />
    </>
  );
};

export default ChatView;
