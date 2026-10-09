export default function Internship() {
    return (
        <section className="section internship-page">
            <style>{`
                .internship-page { padding: 48px 0 92px; background: linear-gradient(180deg, #fff 0%, #f8fafc 100%); border-bottom: 1px solid #e2e8f0; }
                .internship-page__inner { max-width: 1140px; margin: 0 auto; padding: 0 32px; }
                .internship-page__eyebrow { font-size: 13px; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase; color: #2563eb; }
                .internship-page__heading { font-family: "Lora", serif; font-weight: 700; font-size: clamp(26px, 3vw, 32px); color: #0f172a; margin: 14px 0 32px; }
                .internship-page__card { background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 28px; box-shadow: 0 10px 30px -22px rgba(15, 23, 42, .35); }
                .internship-page__title { color: #0f172a; margin: 0 0 8px; }
                .internship-page__meta { color: #2563eb; font-size: 14px; font-weight: 600; margin: 0 0 16px; }
                .internship-page__description { color: #475569; font-size: 15px; line-height: 1.7; margin: 0; }
                @media (max-width: 560px) { .internship-page { padding: 48px 0 72px; } .internship-page__inner { padding: 0 20px; } }
            `}</style>
            <div className="internship-page__inner">
                <p className="internship-page__eyebrow">Internship</p>
                <h1 className="internship-page__heading">Practical full-stack experience</h1>
                <article className="internship-page__card">
                    <h2 className="internship-page__title">Oasis Infobyte</h2>
                    <p className="internship-page__meta">New Delhi</p>
                    <p className="internship-page__description">
                        Developed full-stack web applications using the MERN stack, REST APIs, and responsive UI design. Implemented JWT authentication, MongoDB, Razorpay payment integration, and Git/GitHub-based development.
                    </p>
                </article>
            </div>
        </section>
    );
}
