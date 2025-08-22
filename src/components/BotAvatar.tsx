import { useState, useEffect } from "react";
import botAvatarImage from "@/assets/pycode-bot-avatar.png";

interface BotAvatarProps {
  isActive?: boolean;
  message?: string;
}

const BotAvatar = ({ isActive = false, message }: BotAvatarProps) => {
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    }, 3000);

    return () => clearInterval(blinkInterval);
  }, []);

  return (
    <div className="relative">
      <div className={`
        relative w-20 h-20 rounded-full overflow-hidden border-4 border-primary
        ${isActive ? 'animate-pulse-glow shadow-glow' : 'shadow-gaming'}
        ${isActive ? 'animate-bounce-gentle' : 'animate-float'}
        transition-all duration-300
      `}>
        <img 
          src={botAvatarImage} 
          alt="PyCode Bot Avatar" 
          className={`w-full h-full object-cover transition-all duration-150 ${isBlinking ? 'brightness-50' : 'brightness-100'}`}
        />
        
        {/* Status indicator */}
        <div className={`
          absolute -top-1 -right-1 w-6 h-6 rounded-full border-2 border-background
          ${isActive ? 'bg-success animate-pulse' : 'bg-muted'}
          transition-colors duration-300
        `} />
      </div>
      
      {/* Speech bubble */}
      {message && (
        <div className="absolute -top-2 left-full ml-4 max-w-xs">
          <div className="bg-gradient-card p-3 rounded-lg border border-border animate-slide-up">
            <p className="text-sm text-foreground">{message}</p>
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-card" />
          </div>
        </div>
      )}
    </div>
  );
};

export default BotAvatar;