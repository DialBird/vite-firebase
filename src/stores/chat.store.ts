import type { Message } from "@/domain/entities/Message";
import { defineStore } from "pinia";

export const useChatStore = defineStore("chat", {
  state: () => ({
    messages: [] as Message[],
  }),
  actions: {
    setMessages(messages: Message[]) {
      this.messages = messages;
    },
  },
});
