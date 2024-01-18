"use client";

import { FC, HTMLAttributes, useContext } from "react";
import { MessagesContext } from "../providers/chatContextProvider";
import { cn } from "../lib/utils";

interface ChatMessageProps extends HTMLAttributes<HTMLDivElement> {}

const ChatMessages: FC<ChatMessageProps> = ({ className, ...props }) => {
  const { messages } = useContext(MessagesContext);
  const invertedMessages = [...messages].reverse();

  return (
    <div
      {...props}
      className={cn(
        "flex flex-col-reverse overflow-y-auto gap-3 scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch",
        className
      )}
    >
      <div className="flex-1 flex-grow" />
      {invertedMessages.map((message) => (
        <div key={message.id} className="chat-message">
          <div
            className={cn("flex items-end", {
              "justify-end": message.isUserMessage,
            })}
          >
            <div
              className={cn(
                "flex flex-col space-y-2 text-sm max-w-xs mx-2 overflow-x-hidden",
                {
                  "bg-blue-600 text-white": message.isUserMessage,
                  "bg-gray-200 text-gray-900": !message.isUserMessage,
                }
              )}
            >
              <p
                className={cn("px-4 py2 rounded-lg", {
                  "bg-blue-600 text-white": message.isUserMessage,
                  "bg-gray-200 text-gray-900": !message.isUserMessage,
                })}
              ></p>
              {/* <MarkdownLite text={message.text} /> */}
              {message.text}
            </div>
          </div>
        </div>
      ))}
      ChatMessage
    </div>
  );
};

export default ChatMessages;
