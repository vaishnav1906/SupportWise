import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Bot, MessageCircle, Zap, ArrowRight, Sparkles, Shield } from "lucide-react";

const Landing = () => {
  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-900/20 dark:to-indigo-900/30 overflow-hidden relative pt-16 pb-16"
      style={{
        backgroundImage: `linear-gradient(rgba(248, 250, 252, 0.9), rgba(219, 234, 254, 0.9)), url('https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Admin Login Button - Top Right */}
      <div className="absolute top-6 right-6 z-20">
        <Button 
          asChild 
          variant="outline"
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-white/30 dark:border-gray-700/30 hover:bg-white/90 dark:hover:bg-gray-800/90 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl px-4 py-2 group"
        >
          <Link to="/admin-login" className="flex items-center gap-2">
            <Shield className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
            Login as Admin
          </Link>
        </Button>
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-emerald-400/20 to-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        {/* Logo/Icon with subtle animation */}
        <div className="mb-12 relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
          <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 flex items-center justify-center mb-6 mx-auto shadow-2xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-500 hover:scale-105">
            <Bot className="w-10 h-10 text-white drop-shadow-sm" />
            <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-yellow-300 animate-pulse" />
          </div>
        </div>

        {/* Main heading with gradient text */}
        <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight">
          <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent bg-300% animate-gradient">
            SupportWise
          </span>
        </h1>

        {/* Subtitle with improved typography */}
        <p className="text-2xl md:text-3xl text-slate-700 dark:text-slate-300 mb-4 max-w-3xl font-light tracking-wide">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-black to-black font-medium">
            Smart support that{" "}
          </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 font-medium">
            understands you
          </span>
        </p>

        <p className="text-lg text-slate-600 dark:text-slate-400 mb-16 max-w-2xl leading-relaxed">
          Get instant answers or create support tickets with our AI assistant that learns and adapts to your needs
        </p>

        {/* Enhanced CTA Button */}
        <div className="flex flex-col sm:flex-row gap-6 mb-20">
          <Button 
            asChild 
            size="lg"
            className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-5 text-lg font-medium rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group border-0"
          >
            <Link to="/support" className="flex items-center gap-3 relative z-10">
              <MessageCircle className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
              Try SupportWise
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </Link>
          </Button>
        </div>

        {/* Enhanced Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl">
          <div className="group bg-white/80 dark:bg-gray-800/60 backdrop-blur-xl rounded-3xl p-8 border border-white/20 dark:border-gray-700/30 hover:bg-white/90 dark:hover:bg-gray-800/80 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/10">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
              <Zap className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-slate-900 dark:text-white font-bold text-xl mb-3 tracking-tight">Instant Answers</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">Get immediate responses with AI-powered FAQ matching that understands context and intent</p>
          </div>
          
          <div className="group bg-white/80 dark:bg-gray-800/60 backdrop-blur-xl rounded-3xl p-8 border border-white/20 dark:border-gray-700/30 hover:bg-white/90 dark:hover:bg-gray-800/80 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/10">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
              <Bot className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-slate-900 dark:text-white font-bold text-xl mb-3 tracking-tight">Smart Understanding</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">Our AI comprehends context and nuance to provide truly personalized assistance</p>
          </div>
          
          <div className="group bg-white/80 dark:bg-gray-800/60 backdrop-blur-xl rounded-3xl p-8 border border-white/20 dark:border-gray-700/30 hover:bg-white/90 dark:hover:bg-gray-800/80 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/10">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
              <MessageCircle className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-slate-900 dark:text-white font-bold text-xl mb-3 tracking-tight">Seamless Escalation</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">Skip the hassle of handoffs with one click, your message lands straight in our support team’s inbox.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
