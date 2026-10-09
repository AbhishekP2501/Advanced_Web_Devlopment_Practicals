const certifications = [
    "Data Structures and Algorithm Analysis",
    "Core Java",
    "Algorithm Design",
    "Advanced Web Development Frameworks",
];

const achievements = [
    "Cleared up to 2 rounds of the University Markup Mania Hackathon for website building with HTML, CSS, and JavaScript.",
    "Cleared the first round of the IBM BOB Hackathon.",
];

export default function Certifications() {
    return (
        <section className="section certifications-page">
            <style>{`
                .certifications-page { padding: 48px 0 92px; background: linear-gradient(180deg, #fff 0%, #f8fafc 100%); border-bottom: 1px solid #e2e8f0; }
                .certifications-page__inner { max-width: 1140px; margin: 0 auto; padding: 0 32px; }
                .certifications-page__eyebrow { font-size: 13px; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase; color: #2563eb; }
                .certifications-page__heading { font-family: "Lora", serif; font-weight: 700; font-size: clamp(26px, 3vw, 32px); color: #0f172a; margin: 14px 0 32px; }
                .certifications-page__grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 22px; }
                .certifications-page__card { background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 24px; box-shadow: 0 10px 30px -22px rgba(15, 23, 42, .35); }
                .certifications-page__card h2 { color: #0f172a; margin: 0 0 16px; font-size: 18px; }
                .certifications-page__list { display: grid; gap: 14px; margin: 0; padding-left: 20px; color: #475569; font-size: 14.5px; line-height: 1.7; }
                @media (max-width: 800px) { .certifications-page__grid { grid-template-columns: 1fr; } }
                @media (max-width: 560px) { .certifications-page { padding: 48px 0 72px; } .certifications-page__inner { padding: 0 20px; } }
            `}</style>
            <div className="certifications-page__inner">
                <p className="certifications-page__eyebrow">Certifications &amp; Achievements</p>
                <h1 className="certifications-page__heading">Continuous learning and participation</h1>
                <div className="certifications-page__grid">
                    <article className="certifications-page__card">
                        <h2>Certifications</h2>
                        <ul className="certifications-page__list">
                            {certifications.map((certification) => <li key={certification}>{certification} (Coursera)</li>)}
                        </ul>
                    </article>
                    <article className="certifications-page__card">
                        <h2>Achievements</h2>
                        <ul className="certifications-page__list">
                            {achievements.map((achievement) => <li key={achievement}>{achievement}</li>)}
                        </ul>
                    </article>
                </div>
            </div>
        </section>
    );
}
