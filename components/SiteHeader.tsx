import Link from "next/link";

export default function SiteHeader() {
    return (
        <header className="gallery-frame gallery-header">
            <Link href="/" className="gallery-brand">Sujal Choudhari</Link>
            <nav aria-label="Primary navigation" className="gallery-nav">
                <Link href="/sale">Works for Sale</Link>
                <a href="https://sujal.xyz/" target="_blank" rel="noopener noreferrer">Portfolio</a>
                <a href="https://blog.sujal.xyz/" target="_blank" rel="noopener noreferrer">Blog</a>
            </nav>
        </header>
    );
}
