import apiClient from "../../globals/config/apiClient";
import {type Conversation, type Message} from "../../globals/interfaces";

export function fetchMessages(
  userId: number,
  conversationId: number,
  nextUrl: string,
): Promise<Message[]> {
  const url = `/user/${userId}/conversation/${conversationId}/message`;
  return apiClient
    .get(nextUrl ?? url)
    .then(({data}) => data)
    .catch(({response}) => {
      const error: Error = {
        name: `${response.status as string} error`,
        message: "Something went wrong, please try again later",
      };
      throw error;
    });
}

export function sendMessage(
  userId: number,
  conversationId: number,
  message: string,
): Promise<Message> {
  return apiClient
    .post(`user/${userId}/conversation/${conversationId}/message`, {
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

export function createConversation(
  userId: number,
  friendId: number,
): Promise<Conversation> {
  return apiClient
    .post(`user/${userId}/conversation`, {
      user_ids: [friendId],
    })
    .then(({data}) => data.data)
    .catch(({response}) => {
      const error: Error = {
        name: `${response.status as string} error`,
        message:
          "Unfortunately, we wasn't able to create new conversation, please try again later",
      };
      throw error;
    });
}
