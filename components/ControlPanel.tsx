import { motion } from "framer-motion";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";

interface ControlPanelProps {
  isMusicPlaying: boolean;
  toggleMusic: () => void;
  scrollSpeed: number;
  handleSpeedChange: (speed: number) => void;
  isScrolling: boolean;
  toggleScrolling: () => void;
}

export default function ControlPanel({
  isMusicPlaying,
  toggleMusic,
  scrollSpeed,
  handleSpeedChange,
  isScrolling,
  toggleScrolling,
}: ControlPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="absolute top-4 left-4 right-4 z-30 flex justify-between items-center"
    >
      {/* Music Control - Left (Empty div to maintain spacing balance) */}
      <div />

      {/* Art Gallery Title - Center */}
      <h1 className="text-2xl md:text-4xl font-cursive bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent ">
        Art Gallery
      </h1>

      {/* Speed and Play Controls - Right */}
      <div className="flex items-center gap-2">
        <button
          onClick={toggleMusic}
          className="bg-black/30 backdrop-blur-sm rounded-full p-2 text-yellow-400 hover:text-yellow-300 transition-colors duration-300"
          aria-label={isMusicPlaying ? "Mute music" : "Play music"}
        >
          {isMusicPlaying ? <Volume2 size={16} /> : <VolumeX size={16} />}
        </button>
        <button
          onClick={() =>
            handleSpeedChange(scrollSpeed === 4 ? 1 : scrollSpeed === 1 ? 2 : 4)
          }
          className="bg-black/30 backdrop-blur-sm rounded-full px-3 py-2 text-yellow-400 hover:text-yellow-300 transition-colors duration-300 text-sm font-serif"
          aria-label={`Set scroll speed to ${scrollSpeed === 4 ? 1 : scrollSpeed === 1 ? 2 : 4}x`}
        >
          {scrollSpeed}x
        </button>
        <button
          onClick={toggleScrolling}
          className="bg-black/30 backdrop-blur-sm rounded-full p-2 text-yellow-400 hover:text-yellow-300 transition-colors duration-300"
          aria-label={isScrolling ? "Pause scrolling" : "Start scrolling"}
        >
          {isScrolling ? <Pause size={16} /> : <Play size={16} />}
        </button>
      </div>
    </motion.div>
  );
}