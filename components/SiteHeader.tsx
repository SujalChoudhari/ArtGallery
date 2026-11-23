import Link from "next/link";

export default function SiteHeader() {
    return (
        <header className="gallery-frame gallery-header">
            <Link href="/" className="gallery-brand">Lines &amp; Feelings</Link>
            <nav aria-label="Primary navigation" className="gallery-nav">
                <Link href="/archive">Archive</Link>
                <a href="https://sujal.xyz/">Portfolio</a>
                <a href="https://blog.sujal.xyz/">Blog</a>
            </nav>
        </header>
    );
}
