
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ThumbsUp, ThumbsDown, RotateCcw, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FeedbackFormProps {
  onRetry: () => void;
  onCreateTicket: () => void;
}

export const FeedbackForm = ({ onRetry, onCreateTicket }: FeedbackFormProps) => {
  const { toast } = useToast();

  const handlePositiveFeedback = () => {
    toast({
      title: "Thank you!",
      description: "I'm glad I could help you today.",
    });
  };

  const handleNegativeFeedback = () => {
    toast({
      title: "Feedback received",
      description: "I'll try to do better. Would you like to rephrase your question or create a support ticket?",
    });
  };

  return (
    <Card className="m-4 p-4 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700 animate-fade-in">
      <div className="text-center">
        <h4 className="font-medium text-green-800 dark:text-green-200 mb-3">
          Was this helpful?
        </h4>
        <div className="flex justify-center gap-2 mb-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePositiveFeedback}
            className="bg-white dark:bg-gray-800 border-green-300 dark:border-green-600 hover:bg-green-100 dark:hover:bg-green-800/30"
          >
            <ThumbsUp className="h-4 w-4 mr-1" />
            Yes
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNegativeFeedback}
            className="bg-white dark:bg-gray-800 border-green-300 dark:border-green-600 hover:bg-green-100 dark:hover:bg-green-800/30"
          >
            <ThumbsDown className="h-4 w-4 mr-1" />
            No
          </Button>
        </div>
        <div className="flex justify-center gap-2 text-xs">
          <Button
            variant="ghost"
            size="sm"
            onClick={onRetry}
            className="text-green-700 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-800/30"
          >
            <RotateCcw className="h-3 w-3 mr-1" />
            Try again
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onCreateTicket}
            className="text-green-700 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-800/30"
          >
            <MessageCircle className="h-3 w-3 mr-1" />
            Get human help
          </Button>
        </div>
      </div>
    </Card>
  );
};
