import { motion } from "framer-motion";

interface ArtPieceProps {
  id: number;
  title: string;
  image: string;
  delay: number;
}

export default function ArtPiece({ id, title, image, delay }: ArtPieceProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: delay }}
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
            src={image || "/placeholder.svg"}
            alt={title}
            className="w-auto h-[50vh] md:h-[70vh] object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        {/* Integrated Title within Frame */}
        <div className="absolute bottom-2 md:bottom-4 left-2 md:left-4 right-2 md:right-4">
          <div className="bg-gradient-to-r from-black/80 to-black/60 backdrop-blur-sm px-3 md:px-6 py-1 md:py-2 border border-yellow-500/30">
            <h3 className="text-xs md:text-lg text-yellow-400 font-cursive bg-clip-text text-center">
              {title}
            </h3>
          </div>
        </div>
      </div>
    </motion.div>
  );
}