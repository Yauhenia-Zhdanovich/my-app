import {
  type UseMutationResult,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import apiClient from "../../../globals/config/apiClient";
import {type Conversation} from "../../../globals/interfaces";
import {createConversation} from "../ConversationsService";

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

type ConversationCreateProps = {
  userId: number;
  friendId: number;
};

type ConversationResource = {
  conversations: Conversation[];
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  newConversationMutation: UseMutationResult<
    any,
    Error,
    ConversationCreateProps,
    unknown
  >;
};

export function useConversation(userId?: number): ConversationResource {
  const queryClient = useQueryClient();

  const {data, isLoading, isError, error} = useQuery<
    Conversation[],
    Error,
    Conversation[]
  >(["conversations"], () => fetchConversations(userId!), {
    enabled: Boolean(userId),
  });

  const newConversationMutation = useMutation<
    any,
    Error,
    ConversationCreateProps
  >(
    ["new-conversation"],
    ({userId, friendId}) => createConversation(userId, friendId),
    {
      onSuccess: (conversation) => {
        queryClient.setQueryData(["conversations"], (oldData: any) => {
          oldData.unshift(conversation);

          return [...oldData];
        });
      },
    },
  );

  return {
    conversations: data?.filter((chat) => chat.members.length === 2) ?? [],
    isLoading,
    isError,
    error,
    newConversationMutation,
  };
}
