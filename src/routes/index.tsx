import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { IoSend } from "react-icons/io5";
import { useSidebar } from "@/lib/context/sidebar-context";
import { useChatStore } from "@/lib/store/chatStore";
import { ChatSection } from "@/components/content/chatSection";
import { nanoid } from "nanoid";
import { useState } from "react";
import { SendChat } from "@/lib/api";
import { LoginDialog } from "@/components/content/loginDialog";
import { RateLimitedDialog } from "@/components/content/newChatDialog";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [text, setText] = useState("");
  const [dialog, setDialog] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const addMessage = useChatStore((s) => s.addMessage);
  const conversationId = sessionStorage.getItem("cid") || nanoid();
  const userId = sessionStorage.getItem("uid") || nanoid();

  sessionStorage.setItem("cid", conversationId);
  sessionStorage.setItem("uid", userId);
  const { isSidebarOpen } = useSidebar();

  const messageMutation = useMutation({
    mutationFn: async () => {
      addMessage({ conversationId, userId, role: "user", content: text });
      setText("");
      const res = await SendChat({
        conversationId: conversationId,
        message: text,
      });
      return res;
    },
    onMutate: () => {},
    onSuccess: (res) => {
      addMessage({
        conversationId,
        userId,
        role: "assistant",
        content: res.reply,
      });
    },
    onError: (res) => {
      console.log("res", res);
      setDialog(true);
    },
    onSettled: () => {
      textareaRef.current = null;
    },
  });

  const sendMessage = async () => {
    if (!text.trim()) return;
    messageMutation.mutate();
  };
  return (
    <div
      className={`${isSidebarOpen ? "pl-4 sm:pl-56" : "pl-12 sm:pl-16"} w-full px-4 transition-all duration-300 relative basis-auto flex-col shrink flex justify-end max-sm:grow max-sm:justify-center`}
    >
      <ChatSection />
      <div
        className={`${isSidebarOpen ? "left-4 sm:left-56" : "left-12 sm:left-16"} fixed bottom-0 z-40 right-3 left-0 mx-auto`}
      >
        <textarea
          ref={textareaRef}
          placeholder="Ask anything"
          className="max-h-40 overflow-y-auto bg-white text-black focus:outline-none border-2 w-full rounded-md px-3 pr-10 resize-none transition-all duration-300"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            if (textareaRef.current) {
              textareaRef.current.style.height = "auto";
              textareaRef.current.style.height =
                textareaRef.current.scrollHeight + "px";
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
        />
        <button onClick={sendMessage} className="absolute top-4 right-3">
          <IoSend color="black" />
        </button>
      </div>
      <LoginDialog />
      <RateLimitedDialog dialog={dialog} setDialog={setDialog} />
    </div>
  );
}
