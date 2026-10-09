const education = [
    {
        title: "B.Tech in Computer Engineering",
        place: "CHARUSAT University (Changa)",
        detail: "CGPA: 7.58 (up to 4th semester)",
    },
    {
        title: "Higher Secondary Certificate (HSC)",
        place: "Sarvodaya Schools (Rajkot)",
        detail: "Score: 88%",
    },
    {
        title: "Secondary School Certificate (SSC)",
        place: "Sarvodaya Schools (Rajkot)",
        detail: "Score: 91%",
    },
];

export default function Education() {
    return (
        <section className="about">
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
          margin: 14px 0 32px;
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
        @media (max-width: 560px) {
          .about { padding: 48px 0 72px; }
          .about__inner { padding: 0 20px; }
        }
      `}</style>

            <div className="about__inner">
                <p className="about__eyebrow">Education</p>
                <h1 className="about__heading">Academic background</h1>
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
