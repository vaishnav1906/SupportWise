
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { HelpCircle, MessageCircle } from "lucide-react";

interface SuggestedQuestionsProps {
  questions: string[];
  onQuestionClick: (question: string) => void;
  onCreateTicket: () => void;
}

export const SuggestedQuestions = ({ 
  questions, 
  onQuestionClick, 
  onCreateTicket 
}: SuggestedQuestionsProps) => {
  return (
    <Card className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-700 animate-fade-in">
      <div className="flex items-start gap-2 mb-3">
        <HelpCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
        <div>
          <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
            Try these related questions:
          </h4>
          <div className="space-y-2">
            {questions.slice(0, 3).map((question, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => onQuestionClick(question)}
                className="w-full justify-start text-left h-auto py-2 px-3 text-sm bg-white dark:bg-gray-800 border-yellow-300 dark:border-yellow-600 hover:bg-yellow-100 dark:hover:bg-yellow-800/30"
              >
                {question}
              </Button>
            ))}
          </div>
          <div className="mt-4 pt-3 border-t border-yellow-200 dark:border-yellow-700">
            <Button
              onClick={onCreateTicket}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Create Support Ticket
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
