const skills = [
    {
        name: "Languages",
        detail: "C, C++, JavaScript, Python",
    },
    {
        name: "Frontend",
        detail: "HTML, CSS, React.js",
    },
    {
        name: "Backend",
        detail: "Node.js, Express.js, REST APIs",
      },
      {
        name: "Databases",
        detail: "MongoDB, PostgreSQL, MySQL",
      },
      {
        name: "Developer Tools",
        detail: "Git, GitHub, VS Code",
      },
      {
        name: "Core Concepts",
        detail: "Data Structures and Algorithms, DBMS, CRUD Operations",
      },
      {
        name: "Soft Skills",
        detail: "Problem Solving, Time Management, Adaptability, Critical Thinking, Teamwork",
    },
];

export default function Skills() {
    return (
        <section id="skills" className="skills">
            <style>{`
        .skills { padding: 48px 0 92px; border-bottom: 1px solid #e2e8f0; background: #f8fafc; }
        .skills__container { max-width: 1140px; margin: 0 auto; padding: 0 32px; }
        .skills__eyebrow {
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: #2563eb;
        }
        .skills__heading {
          font-family: "Lora", serif;
          font-weight: 700;
          font-size: clamp(26px, 3vw, 32px);
          color: #0f172a;
          margin: 14px 0 8px;
        }
        .skills__sub {
          font-size: 15px;
          color: #64748b;
          margin: 0 0 40px;
        }
        .skills__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 22px;
        }
        .skills__card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          padding: 28px 24px;
          transition: box-shadow 0.2s ease, transform 0.2s ease, border-color 0.2s ease;
        }
        .skills__card:hover {
          box-shadow: 0 12px 28px -8px rgba(15, 23, 42, 0.12);
          transform: translateY(-3px);
          border-color: #bfdbfe;
        }
        .skills__icon {
          width: 44px;
          height: 44px;
          border-radius: 10px;
          background: #eff6ff;
          color: #2563eb;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 15px;
          margin-bottom: 18px;
        }
        .skills__card-title {
          font-size: 16px;
          font-weight: 700;
          color: #0f172a;
          margin: 0 0 8px;
        }
        .skills__card-detail {
          font-size: 14px;
          color: #64748b;
          line-height: 1.6;
          margin: 0;
        }
        @media (max-width: 800px) {
          .skills__grid { grid-template-columns: 1fr; }
        }
      `}</style>

            <div className="skills__container">
                <p className="skills__eyebrow">Skills</p>
                <h2 className="skills__heading">Technical Skills</h2>
                <p className="skills__sub">Technologies and strengths I bring to full-stack web development.</p>

                <div className="skills__grid">
                    {skills.map((skill, i) => (
                        <div className="skills__card" key={skill.name}>
                            <div className="skills__icon">{String(i + 1).padStart(2, "0")}</div>
                            <h3 className="skills__card-title">{skill.name}</h3>
                            <p className="skills__card-detail">{skill.detail}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}