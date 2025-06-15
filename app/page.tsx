"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"

export default function ArtGallery() {
  const [isLoading, setIsLoading] = useState(true)
  const [isScrolling, setIsScrolling] = useState(true)
  const [scrollSpeed, setScrollSpeed] = useState(1)
  const [isMusicPlaying, setIsMusicPlaying] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const scrollIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Art pieces data
  const artPieces = [
    { id: 1, title: "Golden Horizon", image: "/placeholder.svg?height=600&width=800" },
    { id: 2, title: "Midnight Reverie", image: "/placeholder.svg?height=600&width=800" },
    { id: 3, title: "Ethereal Dreams", image: "/placeholder.svg?height=600&width=800" },
    { id: 4, title: "Cosmic Dance", image: "/placeholder.svg?height=600&width=800" },
    { id: 5, title: "Silent Symphony", image: "/placeholder.svg?height=600&width=800" },
    { id: 6, title: "Temporal Fragments", image: "/placeholder.svg?height=600&width=800" },
  ]

  // Duplicate art pieces for seamless looping
  const duplicatedArtPieces = [...artPieces, ...artPieces]

  // Loading animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  // Initialize audio
  useEffect(() => {
    audioRef.current = new Audio("/placeholder.mp3")
    audioRef.current.loop = true
    audioRef.current.volume = 0.3
  }, [])

  // Auto-scroll functionality with seamless looping
  useEffect(() => {
    if (!isLoading && isScrolling) {
      scrollIntervalRef.current = setInterval(() => {
        if (scrollContainerRef.current) {
          const container = scrollContainerRef.current
          const scrollAmount = scrollSpeed 
          container.scrollLeft += scrollAmount

          // Seamless looping logic
          const singleSetWidth = container.scrollWidth / 2
          if (container.scrollLeft >= singleSetWidth) {
            container.scrollLeft = 0
          }
        }
      }, 16) // ~60fps
    } else {
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current)
      }
    }

    return () => {
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current)
      }
    }
  }, [isLoading, isScrolling, scrollSpeed])

  const toggleScrolling = () => {
    setIsScrolling(!isScrolling)
  }

  const handleSpeedChange = (speed: number) => {
    setScrollSpeed(speed)
  }

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play().catch(console.error)
      }
      setIsMusicPlaying(!isMusicPlaying)
    }
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-white overflow-hidden relative">
      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 bg-zinc-900 flex items-center justify-center z-40"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-6xl lg:text-8xl font-serif bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent text-center px-4"
              style={{
                textShadow: "0 0 30px rgba(255, 215, 0, 0.3)",
              }}
            >
              Sujal Choudhari
            </motion.h1>

            {/* Decorative lines */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="absolute top-1/2 left-1/4 w-16 md:w-32 h-px bg-gradient-to-r from-transparent to-yellow-500"
            />
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="absolute top-1/2 right-1/4 w-16 md:w-32 h-px bg-gradient-to-l from-transparent to-yellow-500"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Control Panel */}
      {!isLoading && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="absolute top-4 left-4 right-4 z-30 flex justify-between items-center"
        >
          {/* Music Control - Left */}
          <div>
          </div>

          {/* Art Gallery Title - Center */}
          <h1 className="text-2xl md:text-4xl font-serif bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent italic">
            Art Gallery
          </h1>

          {/* Speed and Play Controls - Right */}
          <div className="flex items-center gap-2">
           <button
            onClick={toggleMusic}
            className="bg-black/30 backdrop-blur-sm rounded-full p-2 text-yellow-400 hover:text-yellow-300 transition-colors duration-300"
          >
            {isMusicPlaying ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>
            <button
              onClick={() => handleSpeedChange(scrollSpeed === 4 ? 1 : scrollSpeed === 1 ? 2 : 4)}
              className="bg-black/30 backdrop-blur-sm rounded-full px-3 py-2 text-yellow-400 hover:text-yellow-300 transition-colors duration-300 text-sm font-serif"
            >
              {scrollSpeed}x
            </button>
            <button
              onClick={toggleScrolling}
              className="bg-black/30 backdrop-blur-sm rounded-full p-2 text-yellow-400 hover:text-yellow-300 transition-colors duration-300"
            >
              {isScrolling ? <Pause size={16} /> : <Play size={16} />}
            </button>
          </div>
        </motion.div>
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
                <motion.div
                  key={`${piece.id}-${index}`}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: (index % artPieces.length) * 0.1 }}
                  className="relative flex-shrink-0 group"
                >
                  {/* Elegant Frame with Integrated Title */}
                  <div className="relative p-3 md:p-6 bg-gradient-to-br from-yellow-600/20 to-yellow-400/10 rounded-sm">
                    {/* Outer frame border */}
                    <div className="absolute inset-0 border border-yellow-500/60 rounded-sm"></div>

                    {/* Inner frame border */}
                    <div className="absolute inset-1 md:inset-2 border border-yellow-400/40 rounded-sm"></div>

                    {/* Corner decorations */}
                    <div className="absolute top-0.5 left-0.5 md:top-1 md:left-1 w-2 h-2 md:w-4 md:h-4 border-l border-t border-yellow-500/80"></div>
                    <div className="absolute top-0.5 right-0.5 md:top-1 md:right-1 w-2 h-2 md:w-4 md:h-4 border-r border-t border-yellow-500/80"></div>
                    <div className="absolute bottom-0.5 left-0.5 md:bottom-1 md:left-1 w-2 h-2 md:w-4 md:h-4 border-l border-b border-yellow-500/80"></div>
                    <div className="absolute bottom-0.5 right-0.5 md:bottom-1 md:right-1 w-2 h-2 md:w-4 md:h-4 border-r border-b border-yellow-500/80"></div>

                    {/* Image */}
                    <div className="relative overflow-hidden">
                      <img
                        src={piece.image || "/placeholder.svg"}
                        alt={piece.title}
                        className="w-auto h-[50vh] md:h-[70vh] object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>

                    {/* Integrated Title within Frame */}
                    <div className="absolute bottom-2 md:bottom-4 left-2 md:left-4 right-2 md:right-4">
                      <div className="bg-gradient-to-r from-black/80 to-black/60 backdrop-blur-sm  px-3 md:px-6 py-1 md:py-2 border border-yellow-500/30">
                        <h3 className="text-xs md:text-lg text-yellow-400 font-serif from-yellow-400 to-yellow-600 bg-clip-text text-center">
                          {piece.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Bottom Credit */}
          <div className="absolute bottom-4 right-4 z-30">
            <p className="text-xs md:text-sm font-serif bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              Made by Sujal Choudhari
            </p>
          </div>
        </motion.div>
      )}
    </div>
  )
}
