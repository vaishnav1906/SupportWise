
import { ChatInterface } from "@/components/ChatInterface";
import { DarkModeProvider } from "@/components/DarkModeProvider";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <DarkModeProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
              Intelligent Support Assistant
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
              Get instant answers or connect with our support team
            </p>
            <div className="flex justify-center gap-4 mb-6">
              <Button asChild className="bg-blue-600 hover:bg-blue-700">
                <Link to="/support">Go to Support Center</Link>
              </Button>
            </div>
          </div>
          <ChatInterface />
        </div>
      </div>
    </DarkModeProvider>
  );
};

export default Index;
