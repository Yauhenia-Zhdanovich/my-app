import {useQuery} from "react-query";
import apiClient from "../../../globals/config/apiClient";
import {type Conversation} from "../../../globals/interfaces";

function fetchConversations(userId: number): Promise<Conversation[]> {
  return apiClient
    .get(`user/${userId}/conversation`)
    .then(({data}) => data.data)
    .catch(({response}) => {
      const error: Error = {
        name: `${response.status as string} error`,
        message: "Something went wrong, please try again later",
      };
      throw error;
    });
}

type ConversationResource = {
  conversations: Conversation[];
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
};

export function useConversation(userId?: number): ConversationResource {
  const {data, isLoading, isError, error} = useQuery<
    Conversation[],
    Error,
    Conversation[]
  >(["conversations"], () => fetchConversations(userId!), {
    enabled: Boolean(userId),
  });

  return {
    conversations: data?.filter((chat) => chat.members.length === 2) ?? [],
    isLoading,
    isError,
    error,
  };
}
