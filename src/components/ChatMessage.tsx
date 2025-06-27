
import { useState, useEffect } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot, User } from "lucide-react";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  type?: string;
  ticketId?: string;
}

interface ChatMessageProps {
  message: Message;
  isTyping?: boolean;
}

export const ChatMessage = ({ message, isTyping = false }: ChatMessageProps) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (message.isBot && !isComplete) {
      let index = 0;
      const text = message.text;
      
      if (isTyping) {
        setDisplayedText("Thinking...");
        return;
      }

      const timer = setInterval(() => {
        if (index <= text.length) {
          setDisplayedText(text.slice(0, index));
          index++;
        } else {
          setIsComplete(true);
          clearInterval(timer);
        }
      }, 30);

      return () => clearInterval(timer);
    } else {
      setDisplayedText(message.text);
      setIsComplete(true);
    }
  }, [message.text, message.isBot, isComplete, isTyping]);

  return (
    <div className={`flex gap-3 ${message.isBot ? 'justify-start' : 'justify-end'} animate-fade-in`}>
      {message.isBot && (
        <Avatar className="h-8 w-8 bg-blue-600">
          <AvatarFallback>
            <Bot className="h-4 w-4 text-white" />
          </AvatarFallback>
        </Avatar>
      )}
      
      <div className={`max-w-[80%] ${message.isBot ? 'order-2' : 'order-1'}`}>
        <div className={`rounded-lg px-4 py-2 ${
          message.isBot 
            ? 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200' 
            : 'bg-blue-600 text-white'
        }`}>
          <div className="whitespace-pre-wrap break-words">
            {displayedText}
            {message.isBot && !isComplete && (
              <span className="inline-block w-2 h-4 bg-blue-600 dark:bg-blue-400 animate-pulse ml-1"></span>
            )}
          </div>
        </div>
        <div className={`text-xs text-gray-500 dark:text-gray-400 mt-1 ${
          message.isBot ? 'text-left' : 'text-right'
        }`}>
          {message.timestamp.toLocaleTimeString()}
        </div>
      </div>
      
      {!message.isBot && (
        <Avatar className="h-8 w-8 bg-gray-600">
          <AvatarFallback>
            <User className="h-4 w-4 text-white" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};
