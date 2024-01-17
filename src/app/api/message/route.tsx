import { ChatGPTMessage } from "app/components/lib/openAI/openai-stream";
import { MessageArraySchema } from "app/components/lib/schemas/message.schema";
import { chatbotPrompt } from "app/helpers/constants/chatbot.prompt";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const parsedMessages = MessageArraySchema.parse(messages);

  const outboundMessages: ChatGPTMessage[] = parsedMessages.map((message) => ({
    role: message.isUserMessage ? "user" : "system",
    content: message.text,
  }));

  outboundMessages.unshift({
    role: "system",
    content: chatbotPrompt,
  });
}
