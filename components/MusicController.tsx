// components/MusicPlayer.tsx
import { Howl } from "howler";
import React, { useEffect, useRef, useState } from "react";

interface MusicPlayerProps {
    isMusicPlaying: boolean;
    onToggleMusic: () => void;
    volume?: number;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({
    isMusicPlaying,
    onToggleMusic,
    volume = 0.6,
}) => {
    const soundRef = useRef<Howl | null>(null);
    const [hasInteracted, setHasInteracted] = useState(false);

    useEffect(() => {
        // Initialize Howl.js sound
        soundRef.current = new Howl({
            src: ["/sounds/bg_music.mp3"],
            loop: true,
            volume: 0.6, // Start with 0 volume for fade-in
            autoplay: true, // Do not autoplay to respect user interaction
            html5: true, // Use HTML5 Audio to prevent issues with mobile
        });

        // Clean up when component unmounts
        return () => {
            if (soundRef.current) {
                soundRef.current.unload();
            }
        };
    }, []);

    useEffect(() => {
        const sound = soundRef.current;

        if (!sound) return;

        if (isMusicPlaying && hasInteracted) {
            // Fade in the music
            if (!sound.playing()) {
                sound.play();
            }
            sound.fade(sound.volume(), volume, 1000); // Fade to target volume over 1 second
        } else {
            // Fade out the music
            if (sound.playing()) {
                sound.fade(sound.volume(), 0, 1000); // Fade to 0 volume over 1 second
                sound.once("fade", () => {
                    sound.pause(); // Pause after fading out
                });
            }
        }
    }, [isMusicPlaying, hasInteracted, volume]);

    // Handle user interaction to enable audio playback
    useEffect(() => {
        const handleInteraction = () => {
            setHasInteracted(true);
            document.removeEventListener("click", handleInteraction);
            document.removeEventListener("keydown", handleInteraction);
        };

        if (!hasInteracted) {
            document.addEventListener("click", handleInteraction);
            document.addEventListener("keydown", handleInteraction);
        }

        return () => {
            document.removeEventListener("click", handleInteraction);
            document.removeEventListener("keydown", handleInteraction);
        };
    }, [hasInteracted]);

    return null; // This component doesn't render anything visible
};

export default MusicPlayer;