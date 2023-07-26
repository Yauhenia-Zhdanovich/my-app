import useConversationId from "../hooks/useConversationId";
import {useUser} from "../../../globals/user/UserContext";
import useMessages from "../hooks/useMessages";
import cx from "classnames";
import "./ConversationItem.scss";
import {IconButton, TextField} from "@mui/material";
import {useState} from "react";
import SendIcon from "@mui/icons-material/Send";
import ErrorAlert from "../../../components/ErrorAlert";
import InfiniteScroll from "react-infinite-scroll-component";

export default function ConversationItem(): JSX.Element {
  const {conversationId} = useConversationId();
  const {user} = useUser();
  const {messages, messageMutation, fetchNextPage, hasNextPage} = useMessages(
    user?.id,
    conversationId,
  );
  const [message, setMessage] = useState("");

  const onMessageSend = (): void => {
    messageMutation.mutate({userId: user?.id, conversationId, message});
    setMessage("");
  };

  return (
    <>
      <div className="message-list" id="scrollableDiv">
        <InfiniteScroll
          dataLength={15}
          next={fetchNextPage}
          style={{display: "flex", flexDirection: "column-reverse"}} // To put endMessage and loader to the top.
          inverse={true}
          hasMore={Boolean(hasNextPage)}
          loader={<span>Loading...</span>}
          scrollableTarget="scrollableDiv"
        >
          {messages.map((message) => {
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
        </InfiniteScroll>
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
        {messageMutation.isError && (
          <ErrorAlert message={messageMutation.error.message} />
        )}
      </div>
    </>
  );
}
