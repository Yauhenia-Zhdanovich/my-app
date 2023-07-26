import {UseMutationResult} from "react-query";
import {Message} from "../../globals/interfaces";

export type MessageMutationParams = {
  userId?: number;
  conversationId?: number;
  message?: string;
};

export type MessagesResource = {
  messages: Message[];
  fetchNextPage: () => any;
  hasNextPage?: boolean;
  messageMutation: UseMutationResult<
    Message,
    Error,
    MessageMutationParams,
    unknown
  >;
};
