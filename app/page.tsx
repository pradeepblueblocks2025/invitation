'use client';

import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Header from './components/Header';
import InvitationCardModal from './components/InvitationCardModal';
import LocationModal from './components/LocationModal';
import CountdownTimer from './components/CountdownTimer';

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showCardModal, setShowCardModal] = useState<boolean>(false);
  const [showLocationModal, setShowLocationModal] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState<boolean>(true); // Changed to false for default unmuted

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    // Initialize media
    const initializeMedia = async () => {
      // Video initialization
      if (videoRef.current) {
        try {
          videoRef.current.muted = true; // Start video muted to ensure autoplay
          await videoRef.current.play();
        } catch (err) {
          console.error("Video play failed:", err);
        }
      }

      // Audio initialization - will attempt after slight delay
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.muted = false;
          audioRef.current.play()
            .then(() => console.log("Audio playing"))
            .catch(e => {
              console.log("Autoplay blocked, showing mute button");
              //setIsMuted(false); // If blocked, default to muted
            });
        }
      }, 500);
    };

    initializeMedia();

    return () => clearTimeout(timer);
  }, []);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(!isMuted);
      // If unmuting and audio wasn't playing, try to play
      if (!audioRef.current.muted && audioRef.current.paused) {
        audioRef.current.play().catch(e => console.log("Play failed:", e));
      }
    }
  };

  return (
    <>
      <Head>
        <title>Wedding Invitation - Mohammed Sajjad & Shabnam</title>
        <meta name="description" content="Wedding invitation for Mohammed Sajjad & Shabnam" />
      </Head>

      {/* Background video with overlay */}
      <div className="fixed inset-0 z-0 overflow-hidden">
         <video
          ref={videoRef}
          autoPlay
          loop
          muted // Video stays muted to ensure autoplay
          playsInline
          className="relative inset-0 z-1 w-full h-full object-cover"
        >
          <source src="/assets/videos/wedding.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
      </div>

      {/* Audio element */}
      <audio ref={audioRef} loop muted={isMuted}>
        <source src="/assets/audio/wedding.mp3" type="audio/mpeg" />
      </audio>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col" style={{ background: '#00000099' }}>

        {isLoading ? (
          <div className="flex-grow flex items-center justify-center">
            <div className="animate-pulse text-white text-4xl font-bold">Loading...</div>
          </div>
        ) : (
          <>
            <Header 
              onToggleMute={toggleMute} 
              isMuted={isMuted}
              onShowCard={() => setShowCardModal(true)}
              onShowLocation={() => setShowLocationModal(true)}
            />

            <main className="flex-grow flex flex-col items-center justify-center px-4 text-center">
              <div 
                className="text-white mb-8 animate-fade-in"
                style={{ animationDelay: '0.5s' }}
              >
                <p className="text-xl md:text-1xl mb-3">We invite you to celebrate the wedding of</p>
                <h1 className="text-4xl md:text-5xl font-bold mb-2">Mohammed Sajjad</h1>
                <p className="text-3xl md:text-4xl mb-2">&</p>
                <h1 className="text-4xl md:text-5xl font-bold">Shabnam</h1>
              </div>
<CountdownTimer 
  targetDate={new Date('August 16, 2025 11:00:00')} 
  className="justify-center my-4"
/>
              <div 
                className="text-white text-xl md:text-2xl mb-8 animate-fade-in"
                style={{ animationDelay: '1s' }}
              >
                <p className="mb-2">Saturday, 16th August 2025</p>
                <p className="mb-2">11:00 AM onwards</p>
                
              </div>

              <div 
                className="animate-fade-in"
                style={{ animationDelay: '1.5s' }}
              >
                <button 
                  onClick={() => setShowCardModal(true)}
                  className="text-gray-600 bg-white bg-opacity-20 hover:bg-opacity-30 font-bold py-3 px-6 rounded-full border border-white border-opacity-50 mr-4 transition-all"
                >
                  View Invitation
                </button>
                <button 
                  onClick={() => setShowLocationModal(true)}
                  className="text-gray-600 bg-white bg-opacity-20 hover:bg-opacity-30 font-bold py-3 px-6 rounded-full border border-white border-opacity-50 transition-all"
                >
                  View Location
                </button>
              </div>
            </main>

            <footer className="py-6 text-white text-center text-sm">
              <p>Best Compliments from Mashum Pillerum</p>
            </footer>
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