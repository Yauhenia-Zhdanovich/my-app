import {Button, InputLabel, MenuItem, Select} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useUser} from "../../../globals/user/UserContext";

import "./ConversationHeader.scss";
import {useState} from "react";
import {useConversation} from "../hooks/useConversation";

export default function ConversationHeader(): JSX.Element {
  const navigate = useNavigate();
  const {user, logout, users} = useUser();
  const onLogoutClick = (): void => {
    logout();
    navigate("/login");
  };
  const [value, setValue] = useState("");
  const {newConversationMutation} = useConversation(user?.id);

  const friends = users.filter((friend) => friend.id !== user?.id);

  const handleChange = (event: any): void => {
    newConversationMutation.mutate({
      friendId: event.target.value,
      userId: user?.id as number,
    });
    setValue("");
  };

  return (
    <div className="list-header">
      <Button size="small" onClick={onLogoutClick} variant="contained">
        Logout
      </Button>
      <Select
        value={value}
        className="select-friend"
        onChange={handleChange}
        placeholder="select user"
        displayEmpty
        size="small"
        label="Add conversation"
      >
        {friends.map((friend) => {
          return (
            <MenuItem key={friend.id} value={friend.id}>
              {friend.name}
            </MenuItem>
          );
        })}
      </Select>
    </div>
  );
}
