"use client";

import { ZoomIn } from "lucide-react";

export default function InspectTriggerButton() {
    return (
        <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent("open-art-inspection"))}
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 border border-[#b91c1c]/60 bg-[#b91c1c]/10 px-4 font-sans text-xs uppercase tracking-[0.12em] text-foreground transition-all hover:border-[#b91c1c] hover:bg-[#b91c1c] hover:text-white sm:w-auto sm:tracking-[0.16em]"
            title="Inspect artwork up close with deep zoom"
        >
            <ZoomIn size={14} aria-hidden="true" />
            <span>Deep Zoom</span>
        </button>
    );
}
