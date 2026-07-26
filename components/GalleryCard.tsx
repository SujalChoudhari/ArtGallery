"use client";

import { motion } from "framer-motion";

interface GalleryCardProps {
    id: number;
    title: string;
    image: string;
    index: number;
    onClick: () => void;
}

export default function GalleryCard({
    title,
    image,
    index,
    onClick,
}: GalleryCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.03 }}
            className="group cursor-pointer"
            onClick={onClick}
        >
            <div className="relative overflow-hidden rounded-none bg-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                <img
                    src={image || "/placeholder.svg"}
                    alt={title}
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                />

                {/* Hover overlay with title */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                        <h3 className="text-sm md:text-base font-sans text-white line-clamp-2">
                            {title}
                        </h3>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
