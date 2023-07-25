import {useQuery} from "react-query";
import apiClient from "../../../globals/config/apiClient";
import {type Conversation} from "../../../globals/interfaces";

function fetchConversations(userId: number): Promise<Conversation[]> {
  return apiClient
    .get(`user/${userId}/conversation`)
    .then(({data}) => data.data);
}

type ConversationResource = {
  conversations: Conversation[];
};

export function useConversation(userId?: number): ConversationResource {
  const {data} = useQuery(
    ["conversations"],
    () => fetchConversations(userId!),
    {
      enabled: Boolean(userId),
    },
  );

  return {
    conversations: data?.filter((chat) => chat.members.length === 2) ?? [],
  };
}
