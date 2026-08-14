import Link from "next/link";

type SiteHeaderProps = {
    dark?: boolean;
};

export default function SiteHeader({ dark = false }: SiteHeaderProps) {
    return (
        <header className="relative z-10 flex items-center justify-between gap-6 px-5 py-5 sm:px-8 lg:px-12">
            <Link
                href="/"
                className={`inline-flex min-h-11 items-center font-serif text-lg tracking-[0.08em] transition-opacity hover:opacity-70 ${dark ? "text-white" : "text-foreground"}`}
            >
                Lines &amp; Feelings
            </Link>
            <nav aria-label="Primary navigation" className="flex items-center gap-5 font-sans text-xs uppercase tracking-[0.18em] sm:gap-8">
                <Link
                    href="/"
                    className={`inline-flex min-h-11 items-center transition-colors hover:underline hover:underline-offset-4 ${dark ? "text-white/75 hover:text-white" : "text-foreground/65 hover:text-foreground"}`}
                >
                    Home
                </Link>
                <Link
                    href="/archive"
                    className={`inline-flex min-h-11 items-center transition-colors hover:underline hover:underline-offset-4 ${dark ? "text-white/75 hover:text-white" : "text-foreground/65 hover:text-foreground"}`}
                >
                    Archive
                </Link>
            </nav>
        </header>
    );
}
