import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";

import { Query, Mutation } from "../../../graphql";

import Messages from "../Messages";
import MessageRow from "../MessageRow";

const ChatView = () => {
  const { data, loading, error } = useQuery(Query.GET_MESSAGES);
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

    console.log(formValues);

    sendMessage({
      variables: formValues,
    });

    formValues.content = "";
  };

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error</p>;

  return (
    <div className="App">
      <header className="App-header">
        <h1>ArctiChat</h1>
        <div className="chat">
          <Messages messages={data.messages} user={formValues.user} />
          <MessageRow
            user={formValues.user}
            content={formValues.content}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        </div>
      </header>
    </div>
  );
};

export default ChatView;
