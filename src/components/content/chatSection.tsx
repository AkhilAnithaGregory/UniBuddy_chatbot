import { useChatStore } from "@/lib/store/chatStore";
import { useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export const ChatSection = () => {
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const messages = useChatStore((s) => s.messages);
  const prevMessagesLength = useRef(0);

  useEffect(() => {
    if (
      chatContainerRef.current &&
      prevMessagesLength.current < messages.length
    ) {
      setTimeout(() => {
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTo({
            top: chatContainerRef.current.scrollHeight,
            behavior: "smooth",
          });
        }
      }, 100);
      prevMessagesLength.current = messages.length;
    }
  }, [messages]);

  return (
    <div
      ref={chatContainerRef}
      className="flex flex-col gap-3 overflow-y-auto flex-1 py-4 text-xs md:text-sm pb-20"
    >
      {messages.map((msg, i) => (
        <div
          key={i}
          className={`flex ${
            msg.role === "user" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`max-w-[480px]:text-[6px] max-w-sm:text-[8px] text-[16px] w-full md:max-w-[70%] lg:w-2/4 px-4 py-2 rounded-lg wrap-break-words whitespace-pre-wrap ${
              msg.role === "user"
                ? "bg-blue-300 text-white"
                : "bg-gray-300 text-black"
            }`}
          >
            <div className="mb-1 text-xs">
              {msg.role === "user" ? (
                <span className="font-bold">username</span>
              ) : (
                <span className="font-bold">Buddy Response</span>
              )}
            </div>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                code({ inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || "");
                  return !inline && match ? (
                    <SyntaxHighlighter
                      style={oneDark}
                      language={match[1]}
                      PreTag="div"
                      {...props}
                    >
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  ) : (
                    <code
                      className={`bg-gray-300 text-black px-1 py-0.5 rounded ${
                        msg.role === "user"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-300 text-black"
                      }`}
                      {...props}
                    >
                      {children}
                    </code>
                  );
                },
              }}
            >
              {msg.content}
            </ReactMarkdown>
          </div>
        </div>
      ))}
    </div>
  );
};
