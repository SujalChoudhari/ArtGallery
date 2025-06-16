// app/ArtGallery.tsx
"use client";

import ArtPiece from "@/components/ArtPiece";
import ControlPanel from "@/components/ControlPanel";
import LoadingScreen from "@/components/LoadingScreen";
import MusicPlayer from "@/components/MusicController";
import artPieces from "@/lib/drawings";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function ArtGallery() {
  const [isLoading, setIsLoading] = useState(true);
  const [isScrolling, setIsScrolling] = useState(true);
  const [scrollSpeed, setScrollSpeed] = useState(1);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [loadedImages, setLoadedImages] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Duplicate art pieces for seamless looping
  const duplicatedArtPieces = [...artPieces, ...artPieces];

  // Image loading logic
  useEffect(() => {
    const requiredLoadedImages = artPieces.length; // 30% threshold

    let loadedCount = 0;
    let canFinishLoading = false;

    // Minimum 2-second timer
    const minimumTimer = setTimeout(() => {
      canFinishLoading = true;
      // Check if we can finish loading now
      if (loadedCount >= requiredLoadedImages) {
        setIsLoading(false);
      }
    }, 2000);

    const handleImageLoad = () => {
      loadedCount++;
      setLoadedImages(loadedCount);

      if (loadedCount >= requiredLoadedImages && canFinishLoading) {
        setIsLoading(false);
      }
    };

    // Preload images
    artPieces.forEach((piece) => {
      const img = new Image();
      img.onload = handleImageLoad;
      img.onerror = handleImageLoad; // Count failed loads too
      img.src = piece.image;
    });

    // Fallback timeout (in case images take too long)
    const fallbackTimer = setTimeout(() => {
      setIsLoading(false);
    }, 10000); // 10 seconds max

    return () => {
      clearTimeout(minimumTimer);
      clearTimeout(fallbackTimer);
    };
  }, []);

  // Auto-scroll functionality with seamless looping
  useEffect(() => {
    if (!isLoading && isScrolling) {
      scrollIntervalRef.current = setInterval(() => {
        if (scrollContainerRef.current) {
          const container = scrollContainerRef.current;
          const scrollAmount = scrollSpeed;
          container.scrollLeft += scrollAmount;

          // Seamless looping logic
          const singleSetWidth = container.scrollWidth / 2;
          if (container.scrollLeft >= singleSetWidth) {
            container.scrollLeft = 0;
          }
        }
      }, 16); // ~60fps
    } else {
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current);
      }
    }

    return () => {
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current);
      }
    };
  }, [isLoading, isScrolling, scrollSpeed]);

  const toggleScrolling = () => {
    setIsScrolling(!isScrolling);
  };

  const handleSpeedChange = (speed: number) => {
    setScrollSpeed(speed);
  };

  const toggleMusic = () => {
    setIsMusicPlaying(!isMusicPlaying);
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white overflow-hidden relative">
      {/* Music Player Component */}
      <MusicPlayer
        isMusicPlaying={isMusicPlaying}
        onToggleMusic={toggleMusic}
        volume={0.60} // Pass desired volume
      />

      {/* Loading Screen with progress */}
      <LoadingScreen
        isLoading={isLoading}
        progress={(loadedImages / artPieces.length) * 100}
      />

      {/* Control Panel */}
      {!isLoading && (
        <ControlPanel
          isMusicPlaying={isMusicPlaying}
          toggleMusic={toggleMusic}
          scrollSpeed={scrollSpeed}
          handleSpeedChange={handleSpeedChange}
          isScrolling={isScrolling}
          toggleScrolling={toggleScrolling}
        />
      )}

      {/* Main Gallery */}
      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="h-screen flex flex-col pt-16 md:pt-20"
        >
          {/* Gallery Container - Horizontal Scroll */}
          <div
            ref={scrollContainerRef}
            className="flex-1 overflow-x-auto overflow-y-hidden cursor-pointer scrollbar-hide"
            onClick={toggleScrolling}
            style={{ height: "calc(100vh - 120px)" }}
          >
            <div className="flex items-center h-full px-4 md:px-8 space-x-6 md:space-x-12">
              {duplicatedArtPieces.map((piece, index) => (
                <ArtPiece
                  key={`${piece.id}-${index}`}
                  id={piece.id}
                  title={piece.title}
                  image={piece.image}
                  delay={(index % artPieces.length) * 0.1}
                />
              ))}
            </div>
          </div>

          {/* Bottom Credit */}
          <div className="absolute bottom-4 right-4 z-30">
            <a href="https://sujal.xyz" target="_blank" className="text-xs md:text-sm font-serif bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent underline hover:text-yellow-300 transition-colors duration-300">
              Made by Sujal Choudhari
            </a>
          </div>
        </motion.div>
      )}
    </div>
  );
}