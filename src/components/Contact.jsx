import { Mail, MapPin, Phone } from "lucide-react";

export default function Contact() {
    return (
        <section className="contact-page">
            <style>{`
                .contact-page { padding: 48px 0 92px; border-bottom: 1px solid #e2e8f0; }
                .contact-page__inner { max-width: 1140px; margin: 0 auto; padding: 0 32px; }
                .contact-page__eyebrow { font-size: 13px; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase; color: #2563eb; }
                .contact-page__heading { font-family: "Lora", serif; font-weight: 700; font-size: clamp(26px, 3vw, 32px); color: #0f172a; margin: 14px 0 20px; }
                .contact-page__text { max-width: 560px; color: #475569; font-size: 15.5px; line-height: 1.75; margin: 0 0 24px; }
                .contact-page__details { display: grid; gap: 10px; color: #475569; font-size: 15px; }
                .contact-page__detail { display: flex; align-items: center; gap: 8px; }
                .contact-page__icon { width: 18px; height: 18px; color: #2563eb; flex: 0 0 auto; }
                .contact-page__linkedin-icon { display: inline-flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 700; line-height: 18px; border: 1px solid #2563eb; border-radius: 3px; }
                .contact-page__details a { color: #2563eb; }
                @media (max-width: 560px) { .contact-page { padding: 48px 0 72px; } .contact-page__inner { padding: 0 20px; } }
            `}</style>
            <div className="contact-page__inner">
                <p className="contact-page__eyebrow">Contact</p>
                <h1 className="contact-page__heading">Let&apos;s build something worth shipping.</h1>
                <p className="contact-page__text">I&apos;m open to opportunities, collaborations, and conversations about full-stack web development.</p>
                <div className="contact-page__details">
                    <p className="contact-page__detail"><Phone className="contact-page__icon" aria-hidden="true" /><a href="tel:+918140046425">+91 8140046425</a></p>
                    <p className="contact-page__detail"><Mail className="contact-page__icon" aria-hidden="true" /><a href="mailto:aabhishekpitroda@gmail.com">aabhishekpitroda@gmail.com</a></p>
                    <p className="contact-page__detail"><MapPin className="contact-page__icon" aria-hidden="true" />Rajkot, Gujarat</p>
                    <p className="contact-page__detail"><span className="contact-page__icon contact-page__linkedin-icon" aria-hidden="true">in</span>LinkedIn: <a href="https://www.linkedin.com/in/abhishek-pitroda-9437a6347" target="_blank" rel="noreferrer">abhishek-pitroda-9437a6347</a></p>
                </div>
            </div>
        </section>
    );
}
