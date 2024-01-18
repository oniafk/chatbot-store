import { FC, HTMLAttributes } from "react";

interface ChatMessageProps extends HTMLAttributes<HTMLDivElement> {}

const ChatMessage: FC<ChatMessageProps> = ({ className, ...props }) => {
  return <div {...props}>ChatMessage</div>;
};

export default ChatMessage;
