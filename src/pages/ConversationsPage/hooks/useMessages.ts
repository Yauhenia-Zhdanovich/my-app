import {useMutation, useQueryClient, useInfiniteQuery} from "react-query";
import {type Message} from "../../../globals/interfaces";
import {type MessageMutationParams, type MessagesResource} from "../interfaces";
import {fetchMessages, sendMessage} from "../ConversationsService";

export default function useMessages(
  userId?: number,
  conversationId?: number,
): MessagesResource {
  const queryClient = useQueryClient();
  // The API is a bit broken - lastPage.links.next is equal to the previous one after second loading
  const {data, fetchNextPage, hasNextPage} = useInfiniteQuery(
    ["messages", conversationId],
    ({pageParam}) => {
      return fetchMessages(userId!, conversationId!, pageParam);
    },
    {
      cacheTime: 0,
      refetchOnWindowFocus: false,
      getNextPageParam: (lastPage: any) => {
        return lastPage.links.next;
      },
      enabled: Boolean(conversationId) && Boolean(userId),
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
          (oldData?: any) => {
            const pagesLength = oldData.pages.length;
            oldData.pages[pagesLength - 1].data.unshift(data);
            return {...oldData};
          },
        );
      },
    },
  );

  const messages = data?.pages
    .map((response) => (response as any).data)
    .flat(2);

  return {
    messages: messages ?? [],
    messageMutation,
    fetchNextPage,
    hasNextPage,
  };
}
