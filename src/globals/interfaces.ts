import {User} from "./user/interfaces";

export type Conversation = {
  id: number;
  last_message: string;
  members: User[];
  name: string;
};

export type Message = {
  id: number;
  user_id: number;
  text: string;
  sent_at: string;
};
