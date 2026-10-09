import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header id="top" className="hero">
            <style>{`
        .hero {
          padding: 110px 0 90px;
          background: radial-gradient(circle at 15% 20%, #eff6ff 0%, #ffffff 55%);
          border-bottom: 1px solid #e2e8f0;
        }
        .hero__inner {
          max-width: 1140px;
          margin: 0 auto;
          padding: 0 32px;
        }
        .hero__eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: #2563eb;
          background: #eff6ff;
          border: 1px solid #dbeafe;
          padding: 7px 16px;
          border-radius: 999px;
          margin-bottom: 28px;
        }
        .hero__title {
          font-family: "Lora", serif;
          font-weight: 700;
          font-size: clamp(34px, 5vw, 54px);
          line-height: 1.18;
          color: #0f172a;
          margin: 0;
          max-width: 780px;
        }
        .hero__title-accent { color: #2563eb; }
        .hero__lead {
          margin-top: 22px;
          max-width: 580px;
          font-size: 16.5px;
          line-height: 1.75;
          color: #475569;
        }
        .hero__actions {
          display: flex;
          gap: 14px;
          margin-top: 38px;
        }
        .hero__btn {
          font-size: 14.5px;
          font-weight: 600;
          padding: 13px 26px;
          border-radius: 8px;
          text-decoration: none;
          transition: background 0.2s ease, border-color 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease;
        }
        .hero__btn--primary {
          background: #2563eb;
          color: #ffffff;
          border: 1px solid #2563eb;
          box-shadow: 0 1px 2px rgba(37, 99, 235, 0.15);
        }
        .hero__btn--primary:hover {
          background: #1d4ed8;
          box-shadow: 0 6px 18px rgba(37, 99, 235, 0.28);
          transform: translateY(-1px);
        }
        .hero__btn--ghost {
          border: 1px solid #cbd5e1;
          color: #0f172a;
          background: #ffffff;
        }
        .hero__btn--ghost:hover {
          border-color: #2563eb;
          color: #2563eb;
        }
        @media (max-width: 560px) {
          .hero { padding: 84px 0 60px; }
          .hero__actions { flex-direction: column; }
          .hero__btn { text-align: center; }
        }
      `}</style>

            <div className="hero__inner">
                <span className="hero__eyebrow">🎓 B.Tech Computer Engineering · CHARUSAT University</span>

                <h1 className="hero__title">
                    Hi, I'm Abhishek Pitroda —
                    <span className="hero__title-accent"> a Full Stack Web Developer</span> building
                    clean, responsive interfaces.
                </h1>

                <p className="hero__lead">
                    Full Stack Web Developer and Computer Engineering student building
                    clean, responsive web applications with modern frontend and backend
                    technologies.
                </p>

                <div className="hero__actions">
                    <Link to="/skills" className="hero__btn hero__btn--primary">View my skills</Link>
                    <Link to="/contact" className="hero__btn hero__btn--ghost">Get in touch</Link>
                </div>
            </div>
        </header>
    );
}