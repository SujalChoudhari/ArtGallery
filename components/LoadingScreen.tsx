import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  isLoading: boolean;
}

export default function LoadingScreen({ isLoading }: LoadingScreenProps) {
  return (
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
            className="text-4xl md:text-6xl lg:text-8xl p-4 font-serif bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent text-center px-4"
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
  );
}