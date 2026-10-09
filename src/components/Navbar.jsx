import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const links = [
    { label: "About", href: "/about" },
    { label: "Skills", href: "/skills" },
    { label: "Education", href: "/education" },
    { label: "Internship", href: "/internship" },
    { label: "Projects", href: "/projects" },
    { label: "Task Manager", href: "/tasks" },
    { label: "Certifications", href: "/certifications" },
    { label: "Contact", href: "/contact" },
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
                <NavLink to="/" className="navbar__brand">
                    Abhishek <span className="navbar__brand-accent">Pitroda</span>
                </NavLink>

                <ul className="navbar__links">
                    {links.map((link) => (
                        <li key={link.href}>
                            <NavLink to={link.href} className={({ isActive }) => isActive ? "active" : undefined}>{link.label}</NavLink>
                        </li>
                    ))}
                </ul>

                <NavLink to="/contact" className="navbar__cta">Let's talk</NavLink>

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
                            <NavLink to={link.href} onClick={() => setOpen(false)} className={({ isActive }) => isActive ? "active" : undefined}>{link.label}</NavLink>
                        </li>
                    ))}
                </ul>
            )}
        </nav>
    );
}