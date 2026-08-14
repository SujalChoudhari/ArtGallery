"use client";

import { useState } from "react";

type ShareButtonProps = {
    title: string;
    url: string;
};

export default function ShareButton({ title, url }: ShareButtonProps) {
    const [status, setStatus] = useState<"idle" | "shared" | "copied">("idle");

    const share = async () => {
        const shareData = {
            title,
            text: `${title} — Lines & Feelings`,
            url,
        };

        try {
            if (typeof navigator !== "undefined" && navigator.share) {
                await navigator.share(shareData);
                setStatus("shared");
                return;
            }

            if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
                await navigator.clipboard.writeText(url);
                setStatus("copied");
                return;
            }

            const input = document.createElement("textarea");
            input.value = url;
            input.setAttribute("readonly", "");
            input.style.position = "fixed";
            input.style.opacity = "0";
            document.body.appendChild(input);
            input.select();
            document.execCommand("copy");
            document.body.removeChild(input);
            setStatus("copied");
        } catch (error) {
            if (error instanceof DOMException && error.name === "AbortError") {
                return;
            }
            setStatus("idle");
        }
    };

    return (
        <button
            type="button"
            onClick={share}
            className="inline-flex min-h-11 items-center justify-center border border-foreground/25 px-5 font-sans text-xs uppercase tracking-[0.16em] transition-colors hover:border-foreground hover:bg-foreground hover:text-background"
            aria-live="polite"
        >
            {status === "shared" ? "Shared" : status === "copied" ? "Link copied" : "Share artwork"}
        </button>
    );
}
