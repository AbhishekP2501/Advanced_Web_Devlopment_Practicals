const socials = [
    { label: "Email", href: "mailto:abhishekpitroda@example.com" },
    { label: "GitHub", href: "https://github.com/AbhishekP2501" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/abhishek-pitroda-2a409140b?utm_source=share_via&utm_content=profile&utm_medium=member_android" },
];

export default function Footer() {
    return (
        <footer id="footer" className="footer">
            <style>{`
        .footer { padding: 90px 0 40px; background: #0f172a; color: #ffffff; }
        .footer__inner {
          max-width: 1140px;
          margin: 0 auto;
          padding: 0 32px;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 40px;
        }
        .footer__eyebrow {
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: #60a5fa;
        }
        .footer__heading {
          font-family: "Lora", serif;
          font-weight: 700;
          font-size: clamp(26px, 3.5vw, 38px);
          line-height: 1.25;
          margin: 14px 0 22px;
        }
        .footer__email {
          font-size: 15px;
          font-weight: 600;
          color: #60a5fa;
          border-bottom: 1px solid #60a5fa;
          padding-bottom: 2px;
          text-decoration: none;
        }
        .footer__meta {
          text-align: right;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 18px;
        }
        .footer__socials {
          display: flex;
          gap: 20px;
          font-size: 14px;
          color: #cbd5e1;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .footer__socials a { color: inherit; text-decoration: none; }
        .footer__socials a:hover { color: #ffffff; }
        .footer__copy { font-size: 12.5px; color: #64748b; margin: 0; }
        @media (max-width: 680px) {
          .footer__inner { flex-direction: column; align-items: flex-start; }
          .footer__meta { align-items: flex-start; text-align: left; }
        }
      `}</style>

            <div className="footer__inner">
                <div>
                    <p className="footer__eyebrow">Contact</p>
                    <h2 className="footer__heading">
                        Let's build something
                        <br />
                        worth shipping.
                    </h2>
                    <a href="mailto:aabhishekpitroda@gmail.com" className="footer__email">
                        aabhishekpitroda@gmail.com
                    </a>
                </div>

                <div className="footer__meta">
                    <ul className="footer__socials">
                        {socials.map((s) => (
                            <li key={s.label}>
                                <a href={s.href} target="_blank" rel="noreferrer">{s.label}</a>
                            </li>
                        ))}
                    </ul>
                    <p className="footer__copy">
                        © {new Date().getFullYear()} Abhishek Pitroda. Built with React.
                    </p>
                </div>
            </div>
        </footer>
    );
}