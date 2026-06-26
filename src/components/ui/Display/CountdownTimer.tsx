"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

interface CountdownTimerProps {
  expiresAt: Date | string | number;
  className?: string;
  onExpire?: () => void;
}

export function CountdownTimer({ expiresAt, className = "", onExpire }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<string>("");
  const [isUrgent, setIsUrgent] = useState(false);

  useEffect(() => {
    const targetDate = new Date(expiresAt).getTime();
    
    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance <= 0) {
        setTimeLeft("Expired");
        setIsUrgent(true);
        if (onExpire) onExpire();
        return;
      }

      const hours = Math.floor(distance / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      
      setTimeLeft(`${hours}h ${minutes}m left`);
      setIsUrgent(hours < 2); // Urgent if less than 2 hours
    };

    updateTimer();
    const interval = setInterval(updateTimer, 60000); // Update every minute
    
    return () => clearInterval(interval);
  }, [expiresAt, onExpire]);

  return (
    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-caption-bold ${isUrgent ? "bg-color-urgent-bg text-color-urgent" : "bg-bg-input text-text-secondary"} ${className}`}>
      <Clock size={14} />
      <span>{timeLeft}</span>
    </div>
  );
}
