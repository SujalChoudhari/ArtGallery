"use client";

import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState, useCallback } from "react";

interface LightboxProps {
  images: Array<{ id: number; title: string; image: string }>;
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function Lightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}: LightboxProps) {
  const [scale, setScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);

  const currentImage = images[currentIndex];

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          if (currentIndex > 0) onNavigate(currentIndex - 1);
          break;
        case "ArrowRight":
          if (currentIndex < images.length - 1) onNavigate(currentIndex + 1);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentIndex, images.length, onClose, onNavigate]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle swipe gestures
  const handleDragEnd = useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      const threshold = 100;
      const velocity = 500;

      // Swipe down to close
      if (info.offset.y > threshold || info.velocity.y > velocity) {
        onClose();
        return;
      }

      // Swipe left/right to navigate
      if (Math.abs(info.offset.x) > threshold || Math.abs(info.velocity.x) > velocity) {
        if (info.offset.x > 0 && currentIndex > 0) {
          onNavigate(currentIndex - 1);
        } else if (info.offset.x < 0 && currentIndex < images.length - 1) {
          onNavigate(currentIndex + 1);
        }
      }

      setScale(1);
      setIsDragging(false);
    },
    [currentIndex, images.length, onClose, onNavigate]
  );

  // Double tap to zoom
  const handleDoubleClick = useCallback(() => {
    setScale((prev) => (prev === 1 ? 2 : 1));
  }, []);

  const goToPrevious = () => {
    if (currentIndex > 0) onNavigate(currentIndex - 1);
  };

  const goToNext = () => {
    if (currentIndex < images.length - 1) onNavigate(currentIndex + 1);
  };

  return (
    <AnimatePresence>
      {isOpen && currentImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Navigation arrows - Desktop */}
          <button
            onClick={goToPrevious}
            disabled={currentIndex === 0}
            className="hidden md:flex absolute left-4 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          <button
            onClick={goToNext}
            disabled={currentIndex === images.length - 1}
            className="hidden md:flex absolute right-4 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          {/* Image container with gestures */}
          <motion.div
            drag
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragElastic={0.2}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={handleDragEnd}
            onDoubleClick={handleDoubleClick}
            className="relative max-w-[90vw] max-h-[85vh] cursor-grab active:cursor-grabbing"
            style={{ scale }}
            animate={{ scale }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImage.id}
                src={currentImage.image}
                alt={currentImage.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="max-w-full max-h-[85vh] object-contain rounded-lg select-none"
                draggable={false}
              />
            </AnimatePresence>
          </motion.div>

          {/* Title and counter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-6 left-0 right-0 text-center px-4"
          >
            <h2
              className="text-lg md:text-xl font-serif text-white mb-2"
              style={{ textShadow: "0 2px 12px rgba(0,0,0,0.9), 0 1px 3px rgba(0,0,0,0.8)" }}
            >
              {currentImage.title}
            </h2>
            <p
              className="text-sm text-white/60"
              style={{ textShadow: "0 1px 6px rgba(0,0,0,0.9)" }}
            >
              {currentIndex + 1} / {images.length}
            </p>
          </motion.div>

          {/* Swipe hint for mobile */}
          <div className="absolute bottom-24 left-0 right-0 text-center md:hidden">
            <p className="text-xs text-white/40">Swipe to navigate • Swipe down to close</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
