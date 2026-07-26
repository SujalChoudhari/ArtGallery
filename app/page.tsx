"use client";

import dynamic from "next/dynamic";
import artPieces from "@/lib/drawings";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";

// Heavy components loaded only when needed
const FeaturedSection = dynamic(() => import("@/components/FeaturedSection"), { ssr: false });
const MasonryLayout   = dynamic(() => import("@/components/MasonryLayout"),   { ssr: false });
const Lightbox        = dynamic(() => import("@/components/Lightbox"),         { ssr: false });

export default function ArtGallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showArchive, setShowArchive] = useState(false);
  const archiveRef  = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);

  // Toggle .hero-visible on <body> while the full-screen hero is in view
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY < window.innerHeight * 0.85) {
        document.body.classList.add("hero-visible");
      } else {
        document.body.classList.remove("hero-visible");
      }
    };
    // Set initial state
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.body.classList.remove("hero-visible");
    };
  }, []);

  // Sort by ID descending (newest first)
  const reversedArtPieces = [...artPieces].sort((a, b) => b.id - a.id);
  const featuredPieces = artPieces
    .filter(p => (p as any).isFeatured)
    .sort((a, b) => ((a as any).featuredOrder ?? 99) - ((b as any).featuredOrder ?? 99));
  // Archive = everything that is NOT featured; pin #46 ("A Bad One") to the very end
  const archivePieces = reversedArtPieces
    .filter(p => !(p as any).isFeatured)
    .sort((a, b) => {
      if (a.id === 46) return 1;
      if (b.id === 46) return -1;
      return 0;
    });


  const handleScrollDown = () => {
    featuredRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleUnlockArchive = () => {
    setShowArchive(true);
    setTimeout(() => {
      archiveRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox   = () => setLightboxOpen(false);
  const navigateLightbox = (index: number) => setCurrentImageIndex(index);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">

      {/* ── Full-screen Hero ── */}
      <section className="relative w-full h-screen overflow-hidden">
        {/* Background image — loaded eagerly as it is the LCP element */}
        <img
          src="/drawings/72_Kanheri_Warli_Cave_Painting.jpg"
          alt="Kanheri Warli Cave Painting"
          className="absolute inset-0 w-full h-full object-cover object-center"
          fetchPriority="high"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/85" />

        {/* Centre intro text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
        >
          <p className="text-white/70 font-sans text-xs md:text-sm uppercase tracking-[0.35em] mb-5">
            A Personal Collection
          </p>
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-serif font-medium text-white leading-tight mb-6">
            Lines &amp; Feelings
          </h1>
          <p className="text-white/90 font-sans text-base md:text-xl max-w-md leading-relaxed tracking-wide">
            Sketches, paintings &amp; explorations
            <br />
            by{" "}
            <a
              href="https://sujal.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 decoration-white/40 hover:decoration-white transition-all"
            >
              Sujal Choudhari
            </a>
          </p>
        </motion.div>

        {/* Bottom-right caption */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-6 right-6 text-right"
        >
          <p className="text-white/70 font-sans text-sm tracking-wide">Kanheri Warli Cave Painting</p>
        </motion.div>

        {/* Scroll-down arrow — no label text */}
        <motion.button
          onClick={handleScrollDown}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          aria-label="Scroll down to gallery"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 hover:text-white/90 transition-colors"
        >
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </motion.svg>
        </motion.button>
      </section>

      {/* ── Featured Section ── */}
      <div ref={featuredRef} />
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <FeaturedSection
          artworks={featuredPieces}
          onUnlockArchive={handleUnlockArchive}
          onImageClick={(id) => {
            const idx = featuredPieces.findIndex(p => p.id === id);
            if (idx !== -1) openLightbox(idx);
          }}
        />

        {/* ── Archive (revealed on unlock) ── */}
        <AnimatePresence>
          {showArchive && (
            <motion.div
              ref={archiveRef}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="pt-20 border-t border-border/40"
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-serif font-medium">The Archive</h2>
                <p className="text-muted-foreground mt-2 font-sans text-sm md:text-base">
                  A complete collection of documented works
                </p>
              </div>
              <MasonryLayout items={archivePieces} openLightbox={openLightbox} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* ── Footer ── */}
      <footer className="py-12 text-center border-t mt-8 bg-zinc-50/50">
        <div className="space-y-2">
          <p className="text-sm font-sans text-muted-foreground">
            All sketches &amp; paintings &copy; {new Date().getFullYear()} Sujal Choudhari.
          </p>
          <p className="text-xs text-muted-foreground/60">
            Part of{" "}
            <a href="https://sujal.xyz" className="hover:text-foreground transition-colors underline underline-offset-2">
              sujal.xyz
            </a>
          </p>
        </div>
      </footer>

      {/* ── Lightbox (only mounted when open) ── */}
      {lightboxOpen && (
        <Lightbox
          images={showArchive ? archivePieces : featuredPieces}
          currentIndex={currentImageIndex}
          isOpen={lightboxOpen}
          onClose={closeLightbox}
          onNavigate={navigateLightbox}
        />
      )}
    </div>
  );
}