import { useState, useEffect } from "react";
import "./Navbar.css";

const links = [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#footer" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
            <div className="navbar__inner">
                <a href="#top" className="navbar__brand">
                    Abhishek <span className="navbar__brand-accent">Pitroda</span>
                </a>

                <ul className="navbar__links">
                    {links.map((link) => (
                        <li key={link.href}>
                            <a href={link.href}>{link.label}</a>
                        </li>
                    ))}
                </ul>

                <a href="#footer" className="navbar__cta">Let's talk</a>

                <button
                    className="navbar__toggle"
                    aria-label="Toggle menu"
                    aria-expanded={open}
                    onClick={() => setOpen((v) => !v)}
                >
                    <span />
                    <span />
                </button>
            </div>

            {open && (
                <ul className="navbar__mobile">
                    {links.map((link) => (
                        <li key={link.href}>
                            <a href={link.href} onClick={() => setOpen(false)}>{link.label}</a>
                        </li>
                    ))}
                </ul>
            )}
        </nav>
    );
}