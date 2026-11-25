import Link from "next/link";

export default function NotFound() {
    return (
        <main className="flex min-h-screen items-center justify-center px-6 text-center">
            <div>
                <p className="font-sans text-xs uppercase tracking-[0.25em] text-foreground/45">404</p>
                <h1 className="mt-4 text-5xl">This work is not found.</h1>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                    <Link href="/sale" className="inline-flex min-h-11 items-center border border-foreground/25 px-5 font-sans text-xs uppercase tracking-[0.16em] transition-colors hover:border-foreground hover:bg-foreground hover:text-background">Works for Sale</Link>
                    <Link href="/" className="inline-flex min-h-11 items-center border border-border px-5 font-sans text-xs uppercase tracking-[0.16em] transition-colors hover:border-foreground/40 text-foreground/70 hover:text-foreground">Home</Link>
                </div>
            </div>
        </main>
    );
}
