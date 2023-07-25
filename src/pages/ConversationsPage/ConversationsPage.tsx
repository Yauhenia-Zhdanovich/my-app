import {List, ListItem, ListItemButton} from "@mui/material";
import {useConversation} from "./hooks/useConversation";
import "./ConversationsPage.scss";
import unicorn from "../../assets/unicorn.png";
import useConversationId from "./hooks/useConversationId";
import ConversationItem from "./ConversationItem";
import {useUser} from "../../globals/user/UserContext";
import cx from "classnames";
import {type Conversation} from "../../globals/interfaces";

export default function ConversationsPage(): JSX.Element {
  const {user} = useUser();

  const {conversationId, setConversationId} = useConversationId();
  const {conversations} = useConversation(user?.id);

  return (
    <div className="conversation-container">
      <List className="conversations-list">
        {conversations.map((conversation: Conversation) => (
          <ListItem
            key={conversation.id}
            className={cx(
              "conversation-item",
              conversationId === conversation.id && "selected-conversation",
            )}
          >
            <ListItemButton
              onClick={() => {
                setConversationId(String(conversation.id));
              }}
            >
              {conversation.name}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <div className="dialog-area">
        {Boolean(conversationId) && <ConversationItem />}
        {!conversationId && (
          <div className="no-selected-conversation">
            <img className="unicorn-image" src={unicorn} />
            <h3>Choose the dialog</h3>
          </div>
        )}
      </div>
    </div>
  );
}
