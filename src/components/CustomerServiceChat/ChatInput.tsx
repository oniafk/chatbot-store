"use client";
import { FC, HTMLAttributes, useContext, useRef, useState } from "react";
import { cn } from "../lib/utils";
import TextareaAutosize from "react-textarea-autosize";
import { useMutation } from "@tanstack/react-query";
import { nanoid } from "nanoid";
import { Message } from "../lib/schemas/message.schema";
import { MessagesContext } from "../providers/chatContextProvider";

import { CornerDownLeft, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

interface ChatInputProps extends HTMLAttributes<HTMLDivElement> {}

//review this

const ChatInput: FC<ChatInputProps> = ({ className, ...props }) => {
  const [customerInput, setCustomerInput] = useState<string>("");
  const {
    messages,
    addMessage,
    removeMessage,
    updateMessage,
    setIsMessageUpdating,
  } = useContext(MessagesContext);

  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const { mutate: sendMessage, isPending } = useMutation({
    mutationFn: async (message: Message) => {
      const response = await fetch("/api/message", {
        method: "POST",
        body: JSON.stringify({ messages: [message] }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response.body;
    },

    onMutate(message) {
      addMessage(message);
    },

    onSuccess: async (stream) => {
      if (!stream) throw new Error("no stream");
      const id = nanoid();
      const responseMessage: Message = {
        id,
        isUserMessage: false,
        text: "",
      };

      addMessage(responseMessage);
      setIsMessageUpdating(true);

      const reader = stream.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);
        updateMessage(id, (prevText) => prevText + chunkValue);
        console.log("chunkValue", chunkValue);
      }

      setIsMessageUpdating(false);
      setCustomerInput("");

      setTimeout(() => {
        textAreaRef.current?.focus();
      }, 10);
    },
    onError(_, message) {
      toast.error("Something went wrong!, please try again. ");
      removeMessage(messages[0].id);
      textAreaRef.current?.focus();
    },
  });

  return (
    <div {...props} className={cn(" border-t border-zinc-300", className)}>
      <div className="relative  mt-4 flex-1 overflow-hidden rounded-lg border-none outline-none">
        <TextareaAutosize
          ref={textAreaRef}
          rows={2}
          maxRows={4}
          value={customerInput}
          onChange={(message) => setCustomerInput(message.target.value)}
          onKeyDown={(userTyping) => {
            if (userTyping.key === "Enter" && !userTyping.shiftKey) {
              userTyping.preventDefault();

              const message = {
                id: nanoid(),
                isUserMessage: true,
                text: customerInput,
              };

              sendMessage(message);
            }
          }}
          autoFocus
          disabled={isPending}
          placeholder=" write your message..."
          className="peer disabled:opacity-50 pr-14 resize-none block w-full border-0 bg-zinc-100 py-1.5 px-2 text-gray-900 focus:ring-0 text-sm sm:leading-6"
        />

        <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
          <kbd className="inline-flex items-center rounded border bg-white border-gray-200 px-1 font-sans text-xs text-gray-400">
            {isPending ? (
              <Loader2 className="w-3 h-3 animate-spin" />
            ) : (
              <CornerDownLeft className="w-3 h-3" />
            )}
          </kbd>
        </div>

        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 border-t border-gray-300  peer-focus:border-t-2 peer-focus:border-indigo-600"
        ></div>
      </div>
    </div>
  );
};

export default ChatInput;
