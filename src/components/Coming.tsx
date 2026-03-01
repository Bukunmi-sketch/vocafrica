import React from 'react';
import {  Sparkles, Clock, Star } from 'lucide-react';


const ComingSoon = ({ tabName = "Content", icon: Icon = Clock }) => {
    return (
      <div className="flex flex-col items-center  justify-center py-16 px-8 text-center">
        <div className="relative mb-6">
          {/* Animated Ring */}
          <div className="absolute inset-0 w-24 h-24 border-4 border-purple-200 rounded-full animate-ping opacity-20"></div>
          <div className="absolute inset-2 w-20 h-20 border-4 border-purple-300 rounded-full animate-ping opacity-30 delay-150"></div>
          
          {/* Icon Container */}
          <div className="relative w-24 h-24 bg-primary rounded-full flex items-center justify-center shadow-xl transform hover:scale-110 transition-transform duration-300">
            <Icon className="w-10 h-10 text-white" />
          </div>
          
          {/* Floating Sparkles */}
          <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-400 animate-bounce delay-300" />
          <Star className="absolute -bottom-1 -left-2 w-4 h-4 text-pink-400 animate-bounce delay-700" />
        </div>
  
        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3">
          {tabName} Coming Soon
        </h3>
        
        <p className="text-gray-600 dark:text-gray-100 mb-6 max-w-md leading-relaxed">
          We're crafting something special for this section. 
          Stay tuned for an amazing experience that's worth the wait.
        </p>
  
        <div className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full text-primary font-medium">
          <Clock className="w-4 h-4" />
          <span>In Development</span>
          <div className="flex gap-1 ml-2">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-150"></div>
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-300"></div>
          </div>
        </div>
      </div>
    );
  };

  export default ComingSoon;