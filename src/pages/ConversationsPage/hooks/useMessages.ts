import {
  type UseMutationResult,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import apiClient from "../../../globals/config/apiClient";
import {type Message} from "../../../globals/interfaces";

function fetchMessages(
  userId: number,
  conversationId: number,
): Promise<Message[]> {
  const url = `/user/${userId}/conversation/${conversationId}/message`;
  return apiClient
    .get(url)
    .then(({data}) => data.data)
    .catch(({response}) => {
      const error: Error = {
        name: `${response.status as string} error`,
        message: "Something went wrong, please try again later",
      };
      throw error;
    });
}

function sendMessage(
  userId: number,
  conversationId: number,
  message: string,
): Promise<Message> {
  return apiClient
    .post(`user/${userId}/conversation/${conversationId + 99}/message`, {
      text: message,
    })
    .then(({data}) => data.data)
    .catch(({response}) => {
      const error: Error = {
        name: `${response.status as string} error`,
        message:
          "Unfortunately, we wasn't able to send your message, please try again later",
      };
      throw error;
    });
}

type MessagesResource = {
  messages: Message[];
  messageMutation: UseMutationResult<
    Message,
    Error,
    MessageMutationParams,
    unknown
  >;
};

type MessageMutationParams = {
  userId?: number;
  conversationId?: number;
  message?: string;
};

export default function useMessages(
  userId?: number,
  conversationId?: number,
): MessagesResource {
  const queryClient = useQueryClient();

  const {data} = useQuery(
    ["messages", conversationId],
    () => fetchMessages(userId!, conversationId!),
    {
      enabled: Boolean(userId) && Boolean(conversationId),
    },
  );

  const messageMutation = useMutation<Message, Error, MessageMutationParams>(
    ["send-message", conversationId],
    ({userId, conversationId, message}) =>
      sendMessage(userId!, conversationId!, message!),
    {
      onSuccess: (data) => {
        queryClient.setQueryData(
          ["messages", conversationId],
          (oldData?: Message[]) => {
            oldData?.unshift(data);
            return oldData ? [...oldData] : [];
          },
        );
      },
    },
  );

  return {
    messages: data ?? [],
    messageMutation,
  };
}
