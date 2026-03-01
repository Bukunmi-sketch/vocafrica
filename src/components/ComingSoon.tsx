import React, { useState, useEffect } from "react";
import {
  Rocket,
  Bell,
  Sparkles,
  Clock,
  ArrowRight,
  Users,
  Settings,
  BarChart3,
  Zap,
  Star,
} from "lucide-react";

// Full Page Coming Soon Component
const ComingSoonPage = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 42,
    hours: 18,
    minutes: 33,
    seconds: 45,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let newSeconds = prev.seconds - 1;
        let newMinutes = prev.minutes;
        let newHours = prev.hours;
        let newDays = prev.days;

        if (newSeconds < 0) {
          newSeconds = 59;
          newMinutes -= 1;
        }
        if (newMinutes < 0) {
          newMinutes = 59;
          newHours -= 1;
        }
        if (newHours < 0) {
          newHours = 23;
          newDays -= 1;
        }

        return {
          days: newDays,
          hours: newHours,
          minutes: newMinutes,
          seconds: newSeconds,
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubscribe = () => {
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => setIsSubscribed(false), 3000);
      setEmail("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-2000"></div>
      </div>

      {/* Floating Icons */}
      <div className="absolute inset-0 pointer-events-none">
        <Sparkles className="absolute top-20 left-20 text-yellow-400 w-6 h-6 animate-bounce delay-300" />
        <Star className="absolute top-40 right-32 text-pink-400 w-5 h-5 animate-bounce delay-700" />
        <Zap className="absolute bottom-32 left-32 text-blue-400 w-6 h-6 animate-bounce delay-1000" />
        <Rocket className="absolute bottom-20 right-20 text-purple-400 w-7 h-7 animate-bounce delay-500" />
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Main Content */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mb-6 shadow-2xl transform hover:scale-110 transition-transform duration-300">
            <Rocket className="w-12 h-12 text-white animate-pulse" />
          </div>

          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent mb-4 animate-fade-in">
            Coming Soon
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
            Something amazing is brewing. Get ready for an experience that will
            blow your mind.
          </p>
        </div>

        {/* Countdown Timer */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {Object.entries(timeLeft).map(([unit, value]) => (
            <div
              key={unit}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
            >
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                {value.toString().padStart(2, "0")}
              </div>
              <div className="text-gray-300 text-sm uppercase tracking-wide">
                {unit}
              </div>
            </div>
          ))}
        </div>

        {/* Email Subscription */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 mb-8">
          <div className="flex items-center justify-center mb-4">
            <Bell className="w-6 h-6 text-yellow-400 mr-2" />
            <h3 className="text-xl font-semibold text-white">Get Notified</h3>
          </div>

          <p className="text-gray-300 mb-6">
            Be the first to know when we launch
          </p>

          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <div className="flex-1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-6 py-4 bg-white/20 border border-white/30 rounded-2xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm"
              />
            </div>
            <button
              onClick={handleSubscribe}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-2xl hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
            >
              {isSubscribed ? (
                <>
                  <span>Subscribed!</span>
                  <Sparkles className="w-5 h-5" />
                </>
              ) : (
                <>
                  <span>Notify Me</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Social Proof */}
        <div className="flex items-center justify-center text-gray-400">
          <Users className="w-5 h-5 mr-2" />
          <span>Join 2,500+ others waiting for launch</span>
        </div>
      </div>
    </div>
  );
};

// Tab Empty State Component
const TabEmptyState = ({ tabName = "Content", icon: Icon = Clock }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
      <div className="relative mb-6">
        {/* Animated Ring */}
        <div className="absolute inset-0 w-24 h-24 border-4 border-purple-200 rounded-full animate-ping opacity-20"></div>
        <div className="absolute inset-2 w-20 h-20 border-4 border-purple-300 rounded-full animate-ping opacity-30 delay-150"></div>

        {/* Icon Container */}
        <div className="relative w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-xl transform hover:scale-110 transition-transform duration-300">
          <Icon className="w-10 h-10 text-white" />
        </div>

        {/* Floating Sparkles */}
        <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-400 animate-bounce delay-300" />
        <Star className="absolute -bottom-1 -left-2 w-4 h-4 text-pink-400 animate-bounce delay-700" />
      </div>

      <h3 className="text-2xl font-bold text-gray-800 mb-3">
        {tabName} Coming Soon
      </h3>

      <p className="text-gray-600 mb-6 max-w-md leading-relaxed">
        We're crafting something special for this section. Stay tuned for an
        amazing experience that's worth the wait.
      </p>

      <div className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full text-purple-700 font-medium">
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

// Demo Component showing both in action
const Demo = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showFullPage, setShowFullPage] = useState(true);

  const tabs = [
    { id: "dashboard", name: "Dashboard", icon: BarChart3 },
    { id: "analytics", name: "Analytics", icon: BarChart3 },
    { id: "users", name: "Users", icon: Users },
    { id: "settings", name: "Settings", icon: Settings },
  ];

  if (showFullPage) {
    return (
      <div>
        <ComingSoonPage />
        <button
          onClick={() => setShowFullPage(false)}
          className="fixed top-4 right-4 px-4 py-2 bg-white/20 backdrop-blur-md text-white rounded-lg hover:bg-white/30 transition-colors z-50"
        >
          View Tab Demo
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <button
        onClick={() => setShowFullPage(true)}
        className="fixed top-4 right-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors z-50"
      >
        View Full Page
      </button>

      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Tab Navigation Demo
        </h1>

        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? "border-purple-500 text-purple-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {tab.name}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="min-h-[500px]">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <div
                  key={tab.id}
                  className={activeTab === tab.id ? "block" : "hidden"}
                >
                  <TabEmptyState tabName={tab.name} icon={Icon} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Demo;
