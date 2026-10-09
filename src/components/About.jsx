export default function About() {
    return (
        <section id="about" className="about">
            <style>{`
        .about { padding: 48px 0 92px; border-bottom: 1px solid #e2e8f0; }
        .about__inner {
          max-width: 1140px;
          margin: 0 auto;
          padding: 0 32px;
        }
        .about__eyebrow {
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: #2563eb;
        }
        .about__heading {
          font-family: "Lora", serif;
          font-weight: 700;
          font-size: clamp(26px, 3vw, 32px);
          line-height: 1.3;
          color: #0f172a;
          margin: 14px 0 20px;
        }
        .about__paragraph {
          color: #475569;
          font-size: 15.5px;
          line-height: 1.75;
          max-width: 480px;
          margin: 0;
        }
        .about__paragraph + .about__paragraph { margin-top: 16px; }

        .about__badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-top: 24px;
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          color: #15803d;
          font-size: 13.5px;
          font-weight: 600;
          padding: 8px 16px;
          border-radius: 999px;
        }

      `}</style>

            <div className="about__inner">
                <div className="about__text">
                    <p className="about__eyebrow">About Me</p>
                    <h2 className="about__heading">
                        A student developer who cares about clean, usable interfaces.
                    </h2>
                    <p className="about__paragraph">
                        I'm a Computer Engineering student at CHARUSAT University with
                        hands-on skills in front-end web development — HTML5, CSS3, and
                        JavaScript. I enjoy turning ideas into interfaces that work
                        smoothly across devices.
                    </p>
                    <p className="about__paragraph">
                        I recently earned a Microsoft UI/UX Design certification and
                        applied what I learned to build and ship my own portfolio site
                        from scratch, focusing on responsive layout and good design
                        fundamentals.
                    </p>

                    <span className="about__badge">✓ Microsoft Certified — UI/UX Design</span>
                </div>

            </div>
        </section>
    );
}