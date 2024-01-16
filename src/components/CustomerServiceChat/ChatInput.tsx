"use client";
import { FC, HTMLAttributes, useState } from "react";
import { cn } from "../lib/utils";
import TextareaAutosize from "react-textarea-autosize";

interface ChatInputProps extends HTMLAttributes<HTMLDivElement> {}

const ChatInput: FC<ChatInputProps> = ({ className, ...props }) => {
  const [messageInput, setMessageInput] = useState<string>("");
  return (
    <div {...props} className={cn(" border-t border-zinc-300", className)}>
      <div className="relative  mt-4 flex-1 overflow-hidden rounded-lg border-none outline-none">
        <TextareaAutosize
          rows={2}
          maxRows={4}
          value={messageInput}
          onChange={(message) => setMessageInput(message.target.value)}
          autoFocus
          placeholder=" write your message..."
          className="peer disabled:opacity-50 pr-14 resize-none block w-full border-0 bg-zinc-100 py-1.5 px-2 text-gray-900 focus:ring-0 text-sm sm:leading-6"
        />
      </div>
    </div>
  );
};

export default ChatInput;

//cn tailwind classnames
// react query for data fetching -- https://react-query.tanstack.com/
