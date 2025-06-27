import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, RotateCcw, Mail, Moon, Sun, Sparkles } from "lucide-react";
import { ChatMessage } from "./ChatMessage";
import { TicketForm } from "./TicketForm";
import { FeedbackForm } from "./FeedbackForm";
import { SuggestedQuestions } from "./SuggestedQuestions";
import { useDarkMode } from "./DarkModeProvider";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  type?: 'greeting' | 'faq' | 'no-match' | 'ticket-created' | 'suggestion';
  ticketId?: string;
}

export const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showTicketForm, setShowTicketForm] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [currentQuery, setCurrentQuery] = useState("");
  const [conversationEnded, setConversationEnded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  useEffect(() => {
    // Add greeting message
    const greetingMessage: Message = {
      id: "greeting",
      text: "👋 Hi! I'm your SupportWise assistant. I can help answer your questions instantly or connect you with our support team. What can I help you with today?",
      isBot: true,
      timestamp: new Date(),
      type: 'greeting'
    };
    setMessages([greetingMessage]);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentQuery(inputMessage);
    setInputMessage("");
    setIsLoading(true);

    // Simulate AI processing
    setTimeout(() => {
      handleAIResponse(inputMessage);
    }, 1500);
  };

  const handleAIResponse = async (query: string) => {
    // Simulate FAQ matching with Gemini API
    const faqMatch = await simulateFAQMatching(query);
    
    if (faqMatch.found) {
      const responseMessage: Message = {
        id: Date.now().toString(),
        text: faqMatch.answer,
        isBot: true,
        timestamp: new Date(),
        type: 'faq'
      };
      setMessages(prev => [...prev, responseMessage]);
      setShowFeedback(true);
    } else {
      const noMatchMessage: Message = {
        id: Date.now().toString(),
        text: "I couldn't find an exact match for your question, but I found some related topics that might help:",
        isBot: true,
        timestamp: new Date(),
        type: 'no-match'
      };
      setMessages(prev => [...prev, noMatchMessage]);
      
      // Show suggested questions after a brief delay
      setTimeout(() => {
        const suggestionMessage: Message = {
          id: Date.now().toString() + "_suggestion",
          text: "If none of these help, I can create a support ticket for you to get personalized assistance.",
          isBot: true,
          timestamp: new Date(),
          type: 'suggestion'
        };
        setMessages(prev => [...prev, suggestionMessage]);
      }, 1000);
    }
    setIsLoading(false);
  };

  const simulateFAQMatching = async (query: string): Promise<{found: boolean, answer: string}> => {
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const faqDatabase = [
      {
        keywords: ["password", "reset", "forgot", "login"],
        answer: "To reset your password, click on 'Forgot Password' on the login page and follow the instructions sent to your email. If you don't receive the email, check your spam folder."
      },
      {
        keywords: ["account", "create", "signup", "register"],
        answer: "Creating an account is easy! Click the 'Sign Up' button and fill in your details. You'll receive a confirmation email to activate your account."
      },
      {
        keywords: ["billing", "payment", "invoice", "charge"],
        answer: "You can view your billing information and download invoices from your account dashboard. If you have billing questions, please contact our finance team."
      },
      {
        keywords: ["support", "help", "contact", "assistance"],
        answer: "I'm here to help! You can ask me questions, and if I can't answer them, I'll help you create a support ticket for our human agents."
      },
      {
        keywords: ["refund", "money", "return", "cancel"],
        answer: "To request a refund, please visit your account dashboard and navigate to the 'Transactions' section. Select the transaction and click 'Request Refund'."
      },
      {
        keywords: ["technical", "issue", "error", "bug"],
        answer: "If you're experiencing technical issues, try clearing your browser cache or restarting the app. If the problem persists, please create a support ticket."
      },
      {
        keywords: ["update", "profile", "change", "details"],
        answer: "You can update your profile information by going to the 'Settings' section in your account dashboard."
      },
      {
        keywords: ["subscription", "plan", "upgrade", "downgrade"],
        answer: "To change your subscription plan, go to the 'Billing' section in your account dashboard and select 'Change Plan'."
      },
      {
        keywords: ["privacy", "data", "security", "policy"],
        answer: "Your privacy is important to us. You can read our privacy policy on the 'Privacy Policy' page accessible from the footer of our website."
      },
      {
        keywords: ["features", "tools", "capabilities", "functions"],
        answer: "Our platform offers a variety of features including AI-powered support, ticket creation, and personalized assistance. Visit the 'Features' page for more details."
      },
      {
        keywords: ["contact", "email", "phone", "reach"],
        answer: "You can contact us via email at suppport.wise@gmail.com or call us at +1-800-123-4567 during business hours."
      },
      {
        keywords: ["hours", "availability", "open", "time"],
        answer: "Our support team is available 24/7 to assist you with any queries or issues."
      }
    ];

    const queryLower = query.toLowerCase();
    for (const faq of faqDatabase) {
      if (faq.keywords.some(keyword => queryLower.includes(keyword))) {
        return { found: true, answer: faq.answer };
      }
    }
    
    return { found: false, answer: "" };
  };

  const handleRetry = () => {
    setInputMessage(currentQuery);
    setShowFeedback(false);
  };

  const handleCreateTicket = () => {
    setShowTicketForm(true);
  };

  const handleTicketCreated = (ticketId: string, userInfo: any) => {
    const ticketMessage: Message = {
      id: Date.now().toString(),
      text: `✅ Support ticket created successfully!\n\nTicket ID: ${ticketId}\n\nOur team will review your request and respond via email within 24 hours. You can reference this ticket ID in any future communications.`,
      isBot: true,
      timestamp: new Date(),
      type: 'ticket-created',
      ticketId
    };
    
    setMessages(prev => [...prev, ticketMessage]);
    setShowTicketForm(false);
    setConversationEnded(true);
    
    toast({
      title: "Ticket Created",
      description: `Your support ticket ${ticketId} has been created successfully.`,
    });
  };

  const handleClearChat = () => {
    setMessages([{
      id: "greeting",
      text: "👋 Hi! I'm your SupportWise assistant. I can help answer your questions instantly or connect you with our support team. What can I help you with today?",
      isBot: true,
      timestamp: new Date(),
      type: 'greeting'
    }]);
    setShowFeedback(false);
    setConversationEnded(false);
    setCurrentQuery("");
  };

  const handleEmailTranscript = () => {
    const transcript = messages
      .map(msg => `[${msg.timestamp.toLocaleTimeString()}] ${msg.isBot ? 'Bot' : 'You'}: ${msg.text}`)
      .join('\n\n');
    
    const emailBody = encodeURIComponent(`Here's my chat transcript:\n\n${transcript}`);
    const emailSubject = encodeURIComponent('Chat Transcript - Support Request');
    
    window.open(`mailto:suppport.wise@gmail.com?subject=${emailSubject}&body=${emailBody}`);
    
    toast({
      title: "Email Client Opened",
      description: "Your chat transcript has been prepared for sending.",
    });
  };

  const suggestedQuestions = [
    "How do I reset my password?",
    "How can I create a new account?",
    "Where can I find my billing information?",
    "How do I contact customer support?",
    "What are your business hours?"
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl shadow-2xl shadow-blue-500/10 border border-white/20 dark:border-gray-700/30 overflow-hidden rounded-3xl transition-all duration-500 hover:shadow-3xl hover:shadow-blue-500/15">
        {/* Enhanced Header */}
        <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 text-white p-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 animate-pulse"></div>
          <div className="relative flex justify-between items-center">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-2xl font-bold tracking-tight">SupportWise Assistant</h2>
              </div>
              <p className="text-blue-100 text-sm flex items-center gap-2 font-medium">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/50"></div>
                Online • Ready to assist you
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleDarkMode}
                className="text-white hover:bg-white/20 backdrop-blur-sm rounded-xl transition-all duration-300 hover:scale-105"
              >
                {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearChat}
                className="text-white hover:bg-white/20 backdrop-blur-sm rounded-xl transition-all duration-300 hover:scale-105"
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleEmailTranscript}
                className="text-white hover:bg-white/20 backdrop-blur-sm rounded-xl transition-all duration-300 hover:scale-105"
              >
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Enhanced Messages */}
        <div className="h-96 overflow-y-auto p-8 space-y-6 bg-gradient-to-b from-slate-50/50 to-white/50 dark:from-gray-900/50 dark:to-gray-800/50 backdrop-blur-sm">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          
          {isLoading && (
            <ChatMessage 
              message={{
                id: "loading",
                text: "Thinking...",
                isBot: true,
                timestamp: new Date()
              }}
              isTyping
            />
          )}

          {messages.some(msg => msg.type === 'no-match') && !showTicketForm && (
            <SuggestedQuestions 
              questions={suggestedQuestions}
              onQuestionClick={(question) => {
                setInputMessage(question);
                handleSendMessage();
              }}
              onCreateTicket={handleCreateTicket}
            />
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Ticket Form */}
        {showTicketForm && (
          <TicketForm 
            query={currentQuery}
            onTicketCreated={handleTicketCreated}
            onCancel={() => setShowTicketForm(false)}
          />
        )}

        {/* Feedback Form */}
        {showFeedback && !conversationEnded && (
          <FeedbackForm 
            onRetry={handleRetry}
            onCreateTicket={handleCreateTicket}
          />
        )}

        {/* Enhanced Input */}
        {!showTicketForm && (
          <div className="p-8 border-t border-white/20 dark:border-gray-700/30 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
            <div className="flex gap-4">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                disabled={isLoading}
                className="flex-1 bg-white/80 dark:bg-gray-700/80 border-white/30 dark:border-gray-600/30 backdrop-blur-sm rounded-2xl px-6 py-4 text-base focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/30 transition-all duration-300"
              />
              <Button 
                onClick={handleSendMessage} 
                disabled={isLoading || !inputMessage.trim()}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-2xl px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
              >
                <Send className="h-5 w-5 group-hover:translate-x-0.5 transition-transform duration-300" />
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};
