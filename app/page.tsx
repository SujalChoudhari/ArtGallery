"use client";

import MasonryLayout from "@/components/MasonryLayout";
import Lightbox from "@/components/Lightbox";
import artPieces from "@/lib/drawings";
import { motion } from "framer-motion";
import { useState } from "react";

export default function ArtGallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Sort by ID descending (newest first) to ensure 1..n reversed order regardless of source file order
  const reversedArtPieces = [...artPieces].sort((a, b) => b.id - a.id);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const navigateLightbox = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* Header / Title */}
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-center pt-8 pb-4"
      >
        <h1 className="text-4xl md:text-6xl font-serif font-medium tracking-tight mb-2">
          Art
        </h1>
        <p className="text-sm md:text-base text-muted-foreground font-serif italic">
          by <a href="https://sujal.xyz" className="underline hover:text-foreground transition-colors">Sujal Choudhari</a>
        </p>
      </motion.header>

      {/* Masonry Grid */}
      <main className="max-w-7xl mx-auto px-3 md:px-6 py-6 md:py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <MasonryLayout items={reversedArtPieces} openLightbox={openLightbox} />
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="py-12 text-center border-t mt-8 bg-zinc-50/50">
        <div className="space-y-2">
          <p className="text-sm font-serif text-muted-foreground">
            All sketches & paintings &copy; {new Date().getFullYear()} Sujal Choudhari.
          </p>
          <p className="text-xs text-muted-foreground/60">
            Part of <a href="https://sujal.xyz" className="hover:text-foreground transition-colors underline underline-offset-2">sujal.xyz</a>
          </p>
        </div>
      </footer>

      {/* Lightbox */}
      <Lightbox
        images={reversedArtPieces}
        currentIndex={currentImageIndex}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        onNavigate={navigateLightbox}
      />
    </div>
  );
}