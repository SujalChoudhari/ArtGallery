"use client";

import { motion } from "framer-motion";

interface FeaturedArtwork {
    id: number;
    title: string;
    image: string;
    thoughts?: string;
}

interface FeaturedSectionProps {
    artworks: FeaturedArtwork[];
    onUnlockArchive: () => void;
    onImageClick: (id: number) => void;
}

export default function FeaturedSection({ artworks, onUnlockArchive, onImageClick }: FeaturedSectionProps) {
    return (
        <div className="w-full flex flex-col">
            {artworks.map((art, index) => (
                <FeaturedCard key={art.id} artwork={art} index={index} onImageClick={onImageClick} />
            ))}
            
            {/* Unlock Archive Section */}
            <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="py-32 flex flex-col items-center justify-center text-center px-4"
            >
                <h2 className="text-3xl md:text-5xl font-serif font-medium mb-6">
                    Beyond the Highlights
                </h2>
                <p className="text-muted-foreground font-serif text-lg mb-10 max-w-xl mx-auto">
                    These were just a few pieces that hold a deeper meaning for me. I have documented many more sketches, paintings, and creative explorations over the years.
                </p>
                <button 
                    onClick={onUnlockArchive}
                    className="px-8 py-4 bg-foreground text-background font-serif text-lg rounded-full hover:bg-foreground/90 transition-all hover:scale-105 shadow-lg flex items-center gap-3 group"
                >
                    Explore the Archive
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-y-1 transition-transform">
                        <path d="M12 5v14M19 12l-7 7-7-7"/>
                    </svg>
                </button>
            </motion.div>
        </div>
    );
}

function FeaturedCard({ artwork, index, onImageClick }: { artwork: FeaturedArtwork, index: number, onImageClick: (id: number) => void }) {
    const isEven = index % 2 === 0;

    return (
        <div className="min-h-[80vh] flex flex-col md:flex-row items-center justify-center py-20 px-4 md:px-12 lg:px-24 gap-12 lg:gap-24 border-b border-border/40 last:border-0">
            {/* Image Side */}
            <motion.div 
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`w-full md:w-1/2 flex justify-center ${isEven ? 'md:order-1' : 'md:order-2'}`}
            >
                <div
                    className="relative group w-full max-w-lg shadow-2xl rounded-sm overflow-hidden bg-gray-100 cursor-zoom-in"
                    onClick={() => onImageClick(artwork.id)}
                >
                    <img 
                        src={artwork.image} 
                        alt={artwork.title} 
                        loading="lazy"
                        className="w-full h-auto max-h-[70vh] object-contain transition-transform duration-700 group-hover:scale-[1.02]"
                    />
                    {/* Fullscreen hint on hover */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32" height="32"
                            viewBox="0 0 24 24"
                            fill="none" stroke="white"
                            strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                            className="opacity-0 group-hover:opacity-80 transition-opacity duration-300 drop-shadow-lg"
                        >
                            <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
                        </svg>
                    </div>
                </div>
            </motion.div>

            {/* Text Side */}
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className={`w-full md:w-1/2 flex flex-col justify-center space-y-6 ${isEven ? 'md:order-2 text-left' : 'md:order-1 md:text-right'}`}
            >
                <span className="sr-only">Featured Work {index + 1}</span>
                <h3 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium leading-tight">
                    {artwork.title}
                </h3>
                {artwork.thoughts && artwork.thoughts.trim() !== "" && (
                    <div className={`relative ${isEven ? 'pl-6 border-l-2' : 'md:pr-6 md:border-r-2'} border-foreground/20`}>
                        <p className="text-lg md:text-xl text-muted-foreground font-serif leading-relaxed italic">
                            "{artwork.thoughts}"
                        </p>
                    </div>
                )}
            </motion.div>
        </div>
    );
}
