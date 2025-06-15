import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  isLoading: boolean;
  progress?: number;
}

export default function LoadingScreen({ 
  isLoading, 
  progress = 0 
}: LoadingScreenProps) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 bg-zinc-900 flex items-center justify-center z-40"
        >
          <div className="relative">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-6xl lg:text-8xl p-4 font-serif bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent text-center px-4"
              style={{
                textShadow: "0 0 30px rgba(255, 215, 0, 0.3)",
              }}
            >
              Sujal Choudhari
            </motion.h1>

            {/* Elegant progress indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="mt-8 flex flex-col items-center"
            >
              {/* Progress bar container */}
              <div className="relative w-64 md:w-80 h-px bg-yellow-500/20 mb-4">
                <motion.div
                  className="absolute top-0 left-0 h-px bg-gradient-to-r from-yellow-400 to-yellow-600"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  style={{
                    boxShadow: "0 0 10px rgba(255, 215, 0, 0.5)",
                  }}
                />
              </div>

              {/* Progress text */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.4 }}
                className="text-sm md:text-base font-serif text-yellow-400/80 tracking-wider"
              >
                Curating Gallery... {Math.round(progress)}%
              </motion.p>
            </motion.div>
          </div>

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

          {/* Additional decorative elements for premium feel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 1.6 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <div className="w-2 h-2 bg-yellow-500/60 rounded-full animate-pulse" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}