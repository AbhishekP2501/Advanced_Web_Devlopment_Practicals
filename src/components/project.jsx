import Repositories from "./Repositories";

const projects = [
    {
        name: "Cashen",
        stack: "Node.js, Express.js, PostgreSQL, HTML, CSS, JavaScript",
        description:
            "Full-stack expense and budget management application with REST APIs, expense CRUD operations, authentication, budget alerts, and spending analytics with interactive charts.",
    },
    {
        name: "Pizzara",
        stack: "React.js, Node.js, Express.js, MongoDB",
        description:
            "Full-stack MERN pizza delivery application with REST APIs and responsive UI, JWT authentication, MongoDB integration, Razorpay payment integration, and Git/GitHub-based development.",
    },
];

export default function Projects() {
    return (
        <section id="projects" className="section">
            <style>{`
                .section { padding: 48px 0 92px; background: linear-gradient(180deg, #fff 0%, #f8fafc 100%); border-bottom: 1px solid #e2e8f0; }
                .section > h2, .projects-grid, .projects-links { max-width: 1140px; margin-left: auto; margin-right: auto; padding-left: 32px; padding-right: 32px; }
                .section > h2 { margin-top: 0; margin-bottom: 32px; font-family: "Lora", serif; font-size: clamp(26px, 3vw, 32px); color: #0f172a; }
                .projects-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 22px; margin-bottom: 32px; }
                .project-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 24px; box-shadow: 0 10px 30px -22px rgba(15, 23, 42, .35); }
                .project-card h3 { color: #0f172a; margin: 0 0 10px; }
                .project-stack { display: inline-flex; padding: 6px 12px; border-radius: 999px; color: #2563eb; background: #eff6ff; border: 1px solid #dbeafe; font-size: 12.5px; font-weight: 600; }
                .project-card p:last-child { color: #475569; font-size: 14.5px; line-height: 1.7; }
                .projects-links { display: flex; gap: 24px; margin-bottom: 16px; }
                .projects-link { color: #2563eb; font-size: 14px; font-weight: 600; text-decoration: none; }
                .projects-link:hover { color: #1d4ed8; }
                @media (max-width: 800px) { .projects-grid { grid-template-columns: 1fr; } }
                @media (max-width: 560px) { .section { padding: 72px 0; } .section > h2, .projects-grid, .projects-links { padding-left: 20px; padding-right: 20px; } .projects-links { flex-direction: column; gap: 12px; } }
            `}</style>
            <h2>Projects</h2>
            <div className="projects-grid">
                {projects.map((project) => (
                    <article className="project-card" key={project.name}>
                        <h3>{project.name}</h3>
                        <p className="project-stack">{project.stack}</p>
                        <p>{project.description}</p>
                    </article>
                ))}
            </div>
            <Repositories embedded />
            
        </section>
    );
}
