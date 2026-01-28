import { create } from "zustand";
import { persist } from "zustand/middleware";

type Message = {
  conversationId: string;
  userId: string;
  role: "user" | "assistant";
  content: string;
};

type ChatState = {
  messages: Message[];
  addMessage: (msg: Message) => void;
  clear: () => void;
};

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      messages: [],
      addMessage: (msg) =>
        set((state) => ({
          messages: [...state.messages, msg],
        })),
      clear: () => set({ messages: [] }),
    }),
    {
      name: "chat-session", // stored in sessionStorage
      storage: {
        getItem: (key) => {
          const item = sessionStorage.getItem(key);
          return item ? JSON.parse(item) : null;
        },
        setItem: (key, value) => {
          sessionStorage.setItem(key, JSON.stringify(value));
        },
        removeItem: (key) => sessionStorage.removeItem(key),
      },
    }
  )
);