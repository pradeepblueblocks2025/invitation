'use client';

import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Header from './components/Header';
import InvitationCardModal from './components/InvitationCardModal';
import LocationModal from './components/LocationModal';
import CountdownTimer from './components/CountdownTimer';
import TypewriterFooter from './components/TypewriterFooter';

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showCardModal, setShowCardModal] = useState<boolean>(false);
  const [showLocationModal, setShowLocationModal] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showAudioPrompt, setShowAudioPrompt] = useState<boolean>(false);
  const userInteracted = useRef<boolean>(false);
  const [visibleSections, setVisibleSections] = useState<number>(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      
      // Reveal sections with alternating animations
      const revealSections = () => {
        setVisibleSections(prev => {
          if (prev < 5) return prev + 1;
          return prev;
        });
        
        if (visibleSections < 5) {
          setTimeout(revealSections, 800); // 800ms between each section
        }
      };
      
      revealSections();
    }, 10000); // Initial loading delay

    // Initialize video
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(console.error);
    }

    return () => clearTimeout(timer);
  }, []);

  const handleUserInteraction = () => {
    if (!userInteracted.current && audioRef.current) {
      userInteracted.current = true;
      setShowAudioPrompt(false);
      audioRef.current.play()
        .then(() => console.log("Audio started after interaction"))
        .catch(e => console.error("Audio play failed:", e));
    }
  };

  useEffect(() => {
    const audioTimer = setTimeout(() => {
      if (audioRef.current && !userInteracted.current) {
        audioRef.current.muted = false;
        audioRef.current.play()
          .then(() => console.log("Audio autoplay succeeded"))
          .catch(e => {
            console.log("Autoplay blocked, showing prompt");
            setShowAudioPrompt(true);
          });
      }
    }, 1000);

    return () => clearTimeout(audioTimer);
  }, []);

  return (
    <>
      <Head>
        <title>Wedding Invitation - Mohammed Sajjad & Shabnam</title>
        <meta name="description" content="Wedding invitation for Mohammed Sajjad & Shabnam" />
        <style jsx global>{`
          @keyframes slideInFromLeft {
            0% {
              opacity: 0;
              transform: translateX(-50px);
            }
            100% {
              opacity: 1;
              transform: translateX(0);
            }
          }
          
          @keyframes slideInFromRight {
            0% {
              opacity: 0;
              transform: translateX(50px);
            }
            100% {
              opacity: 1;
              transform: translateX(0);
            }
          }
          
          .animate-slide-left {
            opacity: 0;
            animation: slideInFromLeft 0.8s ease-out forwards;
          }
          
          .animate-slide-right {
            opacity: 0;
            animation: slideInFromRight 0.8s ease-out forwards;
          }
        `}</style>
      </Head>

      {/* Background video */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="relative inset-0 z-1 w-full h-full object-cover"
        >
          <source src="/assets/videos/wedding.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
      </div>

      {/* Audio element */}
      <audio ref={audioRef} loop autoPlay>
        <source src="/assets/audio/wedding.mp3" type="audio/mpeg" />
      </audio>

       {/* Audio enable prompt */}
      {showAudioPrompt && (
        <div 
          className="fixed bottom-4 left-0 right-0 flex justify-center z-50 animate-bounce"
          onClick={handleUserInteraction}
        >
          <div className="bg-white text-gray-800 px-6 py-3 rounded-full shadow-lg cursor-pointer">
            🔈 Click anywhere to enable sound
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="relative z-10 min-h-screen pt-10 flex flex-col" style={{ background: '#00000099' }}>
        {isLoading ? (
          <div className="flex-grow flex items-center justify-center">
            <div className="animate-pulse text-white text-4xl font-bold"></div>
          </div>
        ) : (
          <>
            

            <main className=" flex flex-col items-center justify-center px-4 text-center">
              {/* Section 1: Wedding couple names - slides from left */}
             <div className={`text-white mt-8 mb-8 ${visibleSections >= 1 ? 'animate-slide-left' : 'opacity-0'}`}
                   style={{ animationDelay: '0.3s' }}>
                <p className="text-xl md:text-1xl mb-8">We invite you to celebrate the wedding of</p>
                <h1 className="text-4xl md:text-7xl font-bold mb-2">Mohammed Sajjad</h1>
                <p className="text-3xl md:text-4xl mb-2">&</p>
                <h1 className="text-4xl md:text-7xl font-bold">Shabnam</h1>
              </div>

              {/* Section 2: Countdown timer - slides from right */}
                <div className={`${visibleSections >= 2 ? 'animate-slide-right' : 'opacity-0'}`}
                   style={{ animationDelay: '0.8s' }}>
                <CountdownTimer 
                  targetDate={new Date('August 16, 2025 11:00:00')} 
                  className="justify-center my-4"
                />
              </div>

              {/* Section 3: Wedding details - slides from left */}
              

              {/* Section 4: Action buttons - slides from right */}
                  <div className={`text-white text-xl md:text-1xl mb-3 ${visibleSections >= 3 ? 'animate-slide-left' : 'opacity-0'}`}
                   style={{ animationDelay: '1.3s' }}>
                <button 
                  onClick={() => setShowCardModal(true)}
                  className="text-white bg-opacity-20 hover:bg-opacity-30 font-bold py-3 px-3 rounded-full border border-white border-opacity-50 mr-4 transition-all hover:scale-105 duration-300"
                >
                  View Invitation
                </button>
                <button 
                  onClick={() => setShowLocationModal(true)}
                  className="text-white bg-opacity-20 hover:bg-opacity-30 font-bold py-3 px-3 rounded-full border border-white border-opacity-50 transition-all hover:scale-105 duration-300"
                >
                  View Location
                </button>
              </div>
            </main>

            {/* Footer - slides from left */}
            <div className={`${visibleSections >= 5 ? 'slide-from-left delay-5' : 'opacity-0'}`}>
              <TypewriterFooter />
            </div>
          </>
        )}
      </div>

      {/* Modals */}
      <InvitationCardModal 
        isOpen={showCardModal} 
        onClose={() => setShowCardModal(false)} 
      />
      <LocationModal 
        isOpen={showLocationModal} 
        onClose={() => setShowLocationModal(false)} 
      />
    </>
  );
}