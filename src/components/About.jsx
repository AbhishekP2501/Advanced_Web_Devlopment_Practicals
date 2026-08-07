const education = [
    {
        title: "B.Tech in Computer Engineering",
        place: "CHARUSAT University",
        detail: "Currently in 5th Semester",
    },
    {
        title: "Higher Secondary Certificate (HSC)",
        place: "Sarvodaya School",
        detail: "Score: 88%",
    },
    {
        title: "Secondary School Certificate (SSC)",
        place: "Sarvodaya School",
        detail: "Score: 90%",
    },
];

export default function About() {
    return (
        <section id="about" className="about">
            <style>{`
        .about { padding: 92px 0; border-bottom: 1px solid #e2e8f0; }
        .about__inner {
          max-width: 1140px;
          margin: 0 auto;
          padding: 0 32px;
          display: grid;
          grid-template-columns: 1.3fr 1fr;
          gap: 64px;
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

        .about__panel {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          padding: 28px;
        }
        .about__panel-title {
          font-size: 12.5px;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: #94a3b8;
          margin: 0 0 20px;
        }
        .about__timeline {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .about__timeline-item {
          position: relative;
          padding-left: 20px;
          border-left: 2px solid #dbeafe;
        }
        .about__timeline-item::before {
          content: "";
          position: absolute;
          left: -6px;
          top: 3px;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #2563eb;
          border: 2px solid #ffffff;
          box-shadow: 0 0 0 2px #dbeafe;
        }
        .about__timeline-title {
          font-size: 14.5px;
          font-weight: 600;
          color: #0f172a;
        }
        .about__timeline-place {
          font-size: 13px;
          color: #2563eb;
          margin-top: 2px;
        }
        .about__timeline-detail {
          font-size: 12.5px;
          color: #64748b;
          margin-top: 2px;
        }

        @media (max-width: 800px) {
          .about__inner { grid-template-columns: 1fr; gap: 36px; }
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

                <div className="about__panel">
                    <p className="about__panel-title">Education</p>
                    <ul className="about__timeline">
                        {education.map((item) => (
                            <li className="about__timeline-item" key={item.title}>
                                <p className="about__timeline-title">{item.title}</p>
                                <p className="about__timeline-place">{item.place}</p>
                                <p className="about__timeline-detail">{item.detail}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}