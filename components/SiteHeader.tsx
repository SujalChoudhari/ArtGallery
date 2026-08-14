import Link from "next/link";

type SiteHeaderProps = {
    dark?: boolean;
};

export default function SiteHeader({ dark = false }: SiteHeaderProps) {
    return (
        <header className="relative z-10 flex items-center justify-between gap-3 px-4 py-3 sm:gap-6 sm:px-8 sm:py-5 lg:px-12">
            <Link
                href="/"
                className={`inline-flex min-h-11 min-w-0 items-center font-serif text-base tracking-[0.04em] transition-opacity hover:opacity-70 sm:text-lg sm:tracking-[0.08em] ${dark ? "text-white" : "text-foreground"}`}
            >
                Lines &amp; Feelings
            </Link>
            <nav aria-label="Primary navigation" className="flex shrink-0 items-center gap-1 font-sans text-[0.68rem] uppercase tracking-[0.12em] sm:gap-8 sm:text-xs sm:tracking-[0.18em]">
                <Link
                    href="/"
                    className={`inline-flex min-h-11 items-center px-1 transition-colors hover:underline hover:underline-offset-4 sm:px-0 ${dark ? "text-white/75 hover:text-white" : "text-foreground/65 hover:text-foreground"}`}
                >
                    Home
                </Link>
                <Link
                    href="/archive"
                    className={`inline-flex min-h-11 items-center px-1 transition-colors hover:underline hover:underline-offset-4 sm:px-0 ${dark ? "text-white/75 hover:text-white" : "text-foreground/65 hover:text-foreground"}`}
                >
                    Archive
                </Link>
            </nav>
        </header>
    );
}
