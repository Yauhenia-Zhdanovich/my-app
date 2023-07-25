import useConversationId from "../hooks/useConversationId";
import {useUser} from "../../../globals/user/UserContext";
import useMessages from "../hooks/useMessages";
import cx from "classnames";
import "./ConversationItem.scss";
import {IconButton, TextField} from "@mui/material";
import {useState} from "react";
import SendIcon from "@mui/icons-material/Send";

export default function ConversationItem(): JSX.Element {
  const {conversationId} = useConversationId();
  const {user} = useUser();
  const {messages, messageMutation} = useMessages(user?.id, conversationId);
  const [message, setMessage] = useState("");

  const onMessageSend = (): void => {
    messageMutation.mutate({userId: user?.id, conversationId, message});
    setMessage("");
  };

  return (
    <>
      <div className="message-list">
        {messages?.map((message) => {
          return (
            <div
              key={message.id}
              className={cx(
                "message",
                message.user_id === user?.id && "user-message",
              )}
            >
              {message.text}
            </div>
          );
        })}
      </div>
      <div className="message-container">
        <TextField
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setMessage(event.target.value);
          }}
          value={message}
          autoComplete={"off"}
          className="message-input"
        ></TextField>
        <IconButton onClick={onMessageSend} disabled={Boolean(!message)}>
          <SendIcon />
        </IconButton>
      </div>
    </>
  );
}
