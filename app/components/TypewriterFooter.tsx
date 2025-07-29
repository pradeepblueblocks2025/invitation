'use client';

import { useState, useEffect, useRef } from 'react';

export default function TypewriterFooter() {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopCount, setLoopCount] = useState(0);
  const text = "Best Compliments from Mashum Pillerum";
  const typingSpeed = 100;
  const deletingSpeed = 50;
  const pauseDuration = 2000;
  const startDelay = 3000;

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const handleTyping = () => {
      if (isDeleting) {
        // Delete text
        setDisplayText(text.substring(0, currentIndex - 1));
        setCurrentIndex(prev => prev - 1);

        if (currentIndex === 0) {
          setIsDeleting(false);
          setLoopCount(prev => prev + 1);
        }
      } else {
        // Add text
        setDisplayText(text.substring(0, currentIndex + 1));
        setCurrentIndex(prev => prev + 1);

        if (currentIndex === text.length) {
          setTimeout(() => setIsDeleting(true), pauseDuration);
        }
      }
    };

    timer = setTimeout(
      handleTyping,
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timer);
  }, [currentIndex, isDeleting, text]);

  // Only start after initial delay
  useEffect(() => {
    const timer = setTimeout(() => {
      if (loopCount === 0) {
        setCurrentIndex(1);
        setDisplayText(text.substring(0, 1));
      }
    }, startDelay);

    return () => clearTimeout(timer);
  }, [loopCount, text]);

  return (
    
    <footer className="py-6 text-white text-center text-xl">
      <p className="font-serif tracking-wider min-h-[1.5em]">
        {displayText}
        <span className={`inline-block w-1 h-6 ml-1 bg-white ${currentIndex < text.length ? 'animate-pulse' : 'opacity-0'}`}></span>
      </p>
    </footer>
  );
}