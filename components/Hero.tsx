"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        let clientX, clientY;

        if ("touches" in e) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = (e as React.MouseEvent).clientX;
            clientY = (e as React.MouseEvent).clientY;
        }

        setMousePosition({
            x: clientX - rect.left,
            y: clientY - rect.top,
        });
    };

    return (
        <div
            ref={containerRef}
            className="relative w-full h-[50vh] md:h-[80vh] overflow-hidden bg-white cursor-none" // Height adjusted
            onMouseMove={handleMouseMove}
            onTouchMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={() => setIsHovered(true)}
            onTouchEnd={() => setIsHovered(false)}
        >
            {/* Real Image (Bottom Layer) */}
            <img
                src="/hero/real.png"
                alt="Real Photo"
                className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
            />

            {/* Art Image (Top Layer) - with mask */}
            <img
                src="/hero/art.png"
                alt="Art Sketch"
                className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
                style={{
                    maskImage: isHovered
                        ? `radial-gradient(circle 250px at ${mousePosition.x}px ${mousePosition.y}px, transparent 0%, black 100%)`
                        : "none",
                    WebkitMaskImage: isHovered
                        ? `radial-gradient(circle 250px at ${mousePosition.x}px ${mousePosition.y}px, transparent 0%, black 100%)`
                        : "none",
                }}
            />

            {/* Custom flash cursor */}
            {isHovered && (
                <div
                    className="absolute pointer-events-none w-10 h-10 border-2 border-white rounded-full -translate-x-1/2 -translate-y-1/2 mix-blend-difference z-50 transition-transform duration-75 ease-out"
                    style={{
                        left: mousePosition.x,
                        top: mousePosition.y
                    }}
                />
            )}

            {/* Hint text if not hovered */}
            {!isHovered && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <p className="text-black/50 bg-white/50 px-4 py-2 rounded-full backdrop-blur-sm text-sm font-sans animate-pulse">
                        Hover to reveal
                    </p>
                </div>
            )}
        </div>
    );
}
