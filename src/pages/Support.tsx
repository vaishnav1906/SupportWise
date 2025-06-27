
import { ChatInterface } from "@/components/ChatInterface";
import { DarkModeProvider } from "@/components/DarkModeProvider";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Bot, Sparkles } from "lucide-react";

const Support = () => {
  return (
    <DarkModeProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-900/20 dark:to-indigo-900/30 transition-colors duration-500 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/15 to-purple-600/15 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-emerald-400/15 to-blue-600/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 py-8">
          {/* Enhanced back button */}
          <div className="mb-8">
            <Button 
              asChild 
              variant="ghost" 
              className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-gray-800/60 backdrop-blur-sm rounded-xl transition-all duration-300 group"
            >
              <Link to="/" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
                Back to Home
              </Link>
            </Button>
          </div>

          {/* Enhanced header */}
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-4 mb-6 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 flex items-center justify-center shadow-2xl shadow-blue-500/25">
                  <Bot className="w-8 h-8 text-white" />
                  <Sparkles className="absolute -top-1 -right-1 w-3 h-3 text-yellow-300 animate-pulse" />
                </div>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                  SupportWise
                </span>
              </h1>
            </div>
            <p className="text-2xl text-slate-700 dark:text-slate-300 mb-3 font-light">
              How can we help you today?
            </p>
            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed max-w-md mx-auto">
              Ask questions or create a support ticket with our intelligent assistant
            </p>
          </div>

          <ChatInterface />
        </div>
      </div>
    </DarkModeProvider>
  );
};

export default Support;
