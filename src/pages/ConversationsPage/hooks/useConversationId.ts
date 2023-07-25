import {useMemo} from "react";
import {useSearchParams} from "react-router-dom";

type ConversationIdResource = {
  conversationId?: number;
  setConversationId: (id: string) => void;
};

export default function useConversationId(): ConversationIdResource {
  const [searchParams, setSearchParams] = useSearchParams();

  const id = useMemo<string | undefined>(() => {
    return searchParams.get("id") ?? undefined;
  }, [searchParams]);

  const setConversationIdParam = (id: string): void => {
    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.set("id", id);
    setSearchParams(nextSearchParams);
  };

  return {
    conversationId: Number(id),
    setConversationId: setConversationIdParam,
  };
}
