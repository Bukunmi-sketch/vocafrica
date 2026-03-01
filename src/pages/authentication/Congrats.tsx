import React, { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import usePreventBackNavigation from '../../hooks/usePreventBackNavigation';
import { useNavigate } from 'react-router-dom';

interface ConfettiPieceProps {
  delay: number;
  duration: number;
  startX: number;
  color: string;
}


const ConfettiPiece: React.FC<ConfettiPieceProps> = ({
  delay,
  duration,
  startX,
  color,
}) => {
  return (
    <div
      className={`absolute w-2 h-2 ${color} rounded-sm opacity-80`}
      style={{
        left: `${startX}%`,
        animation: `confettiFall ${duration}s linear ${delay}s infinite`,
        animationFillMode: "both",
      }}
    />
  );
};

interface ConfettiProps {
  active: boolean;
}


const Confetti: React.FC<ConfettiProps> = ({ active }) => {
  const [pieces, setPieces] = useState<ConfettiPieceProps[]>([]);

  useEffect(() => {
    if (active) {
      const newPieces: ConfettiPieceProps[] = [];
      const colors = [
        "bg-yellow-400",
        "bg-pink-400",
        "bg-blue-400",
        "bg-green-400",
        "bg-purple-400",
        "bg-red-400",
      ];

      for (let i = 0; i < 50; i++) {
        newPieces.push({
          delay: Math.random() * 3,
          duration: 3 + Math.random() * 2,
          startX: Math.random() * 100,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }

      setPieces(newPieces);

      // Clear after 6s
      const timer = setTimeout(() => setPieces([]), 6000);
      return () => clearTimeout(timer);
    }
  }, [active]);

  if (!active) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
  
      <style>
        {`
          @keyframes confettiFall {
            0% {
              transform: translateY(-100vh) rotate(0deg);
              opacity: 1;
            }
            100% {
              transform: translateY(100vh) rotate(720deg);
              opacity: 0;
            }
          }
        `}
      </style>

      {pieces.map((piece, index) => (
        <ConfettiPiece key={index} {...piece} />
      ))}
    </div>
  );
};

// Main Registration Success Page
const RegistrationSuccessPage: React.FC = () => {
  

  usePreventBackNavigation();
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setIsVisible(true), 100);
    const timer2 = setTimeout(() => setShowConfetti(true), 500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const handleSignInClick = () => {
    void navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <Confetti active={showConfetti} />


      <div
        className={`max-w-md w-full text-center transform transition-all duration-1000  ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
          <div className="sm:mb-6 w-full flex md:p-0 flex-col gap-3 items-center  sm:flex-row justify-center mt-5  lg:text-xs  ">
        <img src={"/images/logo/telepractice logo.png"} alt="Alehra" className="h-8 my-4 block" />
      </div>

        {/* Success Icon */}
        <div className="relative mb-8 ">
          <div className="inline-flex items-center justify-center  w-24 h-24 bg-green-100 rounded-full mb-4 relative overflow-hidden">
            <CheckCircle
              className={`w-12 h-12 text-green-600 transform transition-all duration-700 delay-300 ${
                isVisible ? "scale-100 rotate-0" : "scale-0 rotate-180"
              }`}
            />

            {/* Animated rings */}
            <div
              className={`absolute inset-0 border-4 border-green-200 rounded-full animate-ping ${
                isVisible ? "opacity-20" : "opacity-0"
              }`}
              style={{ animationDelay: "0.5s" }}
            />
            <div
              className={`absolute inset-2 border-2 border-green-300 rounded-full animate-ping ${
                isVisible ? "opacity-30" : "opacity-0"
              }`}
              style={{ animationDelay: "0.7s" }}
            />
          </div>

        
           
        </div>

        {/*  Main Content */}
        <div
          className={`transform transition-all duration-700 delay-500 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            🎉 Congratulations!
          </h1>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              Registration Completed Successfully
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Your account has been created and you're all set to get started.
              Please proceed to sign in to access your account and explore all
              the amazing features waiting for you.
            </p>
          </div>

          {/*  Call-to-action */}
          <button
            onClick={handleSignInClick}
            className={`bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-8 rounded-xl 
              shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 
              focus:outline-none focus:ring-4 focus:ring-primary/20 w-full sm:w-auto group ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
            style={{ transitionDelay: "800ms" }}
          >
            <span className="flex items-center justify-center space-x-2">
              <span>Sign In to Your Account</span>
              <svg
                className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5-5 5M6 12h12"
                />
              </svg>
            </span>
          </button>

          <p
            className={`text-md text-primary mt-6 transform transition-all duration-700 delay-1000 font-bold ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
            }`}
          >
            Welcome to our Alehra! We're excited to have you on board.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationSuccessPage;
