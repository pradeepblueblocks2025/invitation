'use client';

import { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDate: Date;
  className?: string;
}

export default function CountdownTimer({ targetDate, className = '' }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    };

    // Calculate immediately
    calculateTimeLeft();

    // Then update every second
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className={`flex gap-4 ${className} text-white`}>
      <div className="text-center">
        <div className="text-4xl font-bold">{timeLeft.days}</div>
        <div className="text-sm uppercase">Days</div>
      </div>
      <div className="text-center">
        <div className="text-4xl font-bold">{timeLeft.hours}</div>
        <div className="text-sm uppercase">Hours</div>
      </div>
      <div className="text-center">
        <div className="text-4xl font-bold">{timeLeft.minutes}</div>
        <div className="text-sm uppercase">Minutes</div>
      </div>
      <div className="text-center">
        <div className="text-4xl font-bold">{timeLeft.seconds}</div>
        <div className="text-sm uppercase">Seconds</div>
      </div>
    </div>
  );
}