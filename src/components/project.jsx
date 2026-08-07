import { useEffect, useState } from "react";

const githubUsername = import.meta.env.VITE_GITHUB_USERNAME || "AbhishekP2501";
const repositoryLimit = 8;

function LoadingSpinner() {
    return (
        <div
            className="projects-status projects-status--loading"
            role="status"
            aria-live="polite"
        >
            <span className="spinner" aria-hidden="true" />
            <p>Loading repositories...</p>
        </div>
    );
}

function ErrorMessage({ message, onRetry }) {
    return (
        <div className="projects-status projects-status--error" role="alert">
            <p>{message}</p>
            <button type="button" className="retry-button" onClick={onRetry}>
                Retry
            </button>
        </div>
    );
}

function RepositoryList({ repos }) {
    return (
        <div className="repo-list">
            {repos.map((repo) => (
                <article className="repo-card" key={repo.id}>
                    <div className="repo-card__heading">
                        <h3>{repo.name}</h3>
                        <span
                            className="repo-stars"
                            aria-label={`${repo.stargazers_count} stars`}
                        >
                            ★ {repo.stargazers_count}
                        </span>
                    </div>
                    <p className="repo-description">
                        {repo.description ||
                            "Public GitHub repository fetched from the API."}
                    </p>
                    <div className="repo-card__footer">
                        <span className="repo-path" title={repo.html_url}>
                            {repo.full_name ||
                                repo.html_url.replace("https://github.com/", "")}
                        </span>
                        <a
                            className="repo-link"
                            href={repo.html_url}
                            target="_blank"
                            rel="noreferrer"
                        >
                            View on GitHub
                        </a>
                    </div>
                </article>
            ))}
        </div>
    );
}

function Projects() {
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    const projects = [
        {
            name: "Cashen",
            stack: "Node.js, Express.js, PostgreSQL, HTML, CSS, JavaScript",
            description:
                "A scalable full stack budget management app to track expenses and optimize personal financial planning, with RESTful APIs, a responsive analytics dashboard, secure auth, and PostgreSQL-backed storage.",
        },
        {
            name: "Pizza Delivery Application",
            stack: "React.js, Node.js, Express.js, MongoDB",
            description:
                "Full-stack app with JWT authentication, role-based access control, a dynamic pizza customization module, an admin dashboard for inventory, and real-time order tracking.",
        },
    ];

    const fetchRepositories = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(
                `https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=${repositoryLimit}`,
            );

            if (!response.ok) {
                throw new Error(
                    `GitHub API request failed with status ${response.status}`,
                );
            }

            const data = await response.json();

            if (!Array.isArray(data)) {
                throw new Error("Unexpected repository data returned by the API");
            }

            setRepos(data);
        } catch (fetchError) {
            setError(
                fetchError instanceof Error
                    ? fetchError.message
                    : "Unable to load repositories",
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRepositories();
    }, []);

    const filteredRepos = repos.filter((repo) =>
        repo.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    return (
        <section id="projects" className="section">
                        <style>{`
                .section {
                    padding: 92px 0;
                    background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
                    border-bottom: 1px solid #e2e8f0;
                }
                .section > h2 {
                    max-width: 1140px;
                    margin: 0 auto 32px;
                    padding: 0 32px;
                    font-family: "Lora", serif;
                    font-size: clamp(26px, 3vw, 32px);
                    line-height: 1.3;
                    color: #0f172a;
                }
                .projects-grid,
                .live-repos {
                    max-width: 1140px;
                    margin: 0 auto;
                    padding: 0 32px;
                }
                .projects-grid {
                    display: grid;
                    grid-template-columns: repeat(2, minmax(0, 1fr));
                    gap: 22px;
                    margin-bottom: 38px;
                }
                .project-card {
                    background: #ffffff;
                    border: 1px solid #e2e8f0;
                    border-radius: 18px;
                    padding: 28px;
                    box-shadow: 0 10px 30px -22px rgba(15, 23, 42, 0.35);
                    transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
                }
                .project-card:hover {
                    transform: translateY(-4px);
                    border-color: #bfdbfe;
                    box-shadow: 0 18px 34px -20px rgba(37, 99, 235, 0.35);
                }
                .project-card h3 {
                    font-size: 18px;
                    line-height: 1.3;
                    color: #0f172a;
                    margin-bottom: 10px;
                }
                .project-stack {
                    font-size: 12.5px;
                    font-weight: 600;
                    color: #2563eb;
                    background: #eff6ff;
                    border: 1px solid #dbeafe;
                    display: inline-flex;
                    padding: 6px 12px;
                    border-radius: 999px;
                    margin-bottom: 16px;
                }
                .project-card p:last-child {
                    color: #475569;
                    font-size: 14.5px;
                    line-height: 1.75;
                    margin: 0;
                }
                .live-repos {
                    margin-top: 18px;
                }
                .live-repos__header {
                    display: flex;
                    justify-content: space-between;
                    gap: 24px;
                    align-items: flex-end;
                    margin-bottom: 22px;
                }
                .live-repos__header h3 {
                    font-size: 18px;
                    color: #0f172a;
                    margin-bottom: 6px;
                }
                .live-repos__header p {
                    font-size: 14px;
                    color: #64748b;
                    margin: 0;
                }
                .repo-search {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                    min-width: 280px;
                }
                .repo-search span {
                    font-size: 12.5px;
                    font-weight: 600;
                    letter-spacing: 0.03em;
                    text-transform: uppercase;
                    color: #94a3b8;
                }
                .repo-search input {
                    width: 100%;
                    border: 1px solid #cbd5e1;
                    background: #ffffff;
                    color: #0f172a;
                    border-radius: 12px;
                    padding: 13px 14px;
                    font: inherit;
                    transition: border-color 0.2s ease, box-shadow 0.2s ease;
                }
                .repo-search input::placeholder {
                    color: #94a3b8;
                }
                .repo-search input:focus {
                    outline: none;
                    border-color: #2563eb;
                    box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.12);
                }
                .repo-list {
                    display: grid;
                    grid-template-columns: repeat(2, minmax(0, 1fr));
                    gap: 18px;
                }
                .repo-card {
                    background: #ffffff;
                    border: 1px solid #e2e8f0;
                    border-radius: 16px;
                    padding: 22px;
                    box-shadow: 0 10px 24px -24px rgba(15, 23, 42, 0.35);
                }
                .repo-card__heading {
                    display: flex;
                    align-items: flex-start;
                    justify-content: space-between;
                    gap: 16px;
                    margin-bottom: 12px;
                }
                .repo-card__heading h3 {
                    font-size: 16px;
                    color: #0f172a;
                    margin: 0;
                }
                .repo-stars {
                    flex-shrink: 0;
                    font-size: 12.5px;
                    font-weight: 700;
                    color: #2563eb;
                    background: #eff6ff;
                    border: 1px solid #dbeafe;
                    border-radius: 999px;
                    padding: 6px 10px;
                }
                .repo-description {
                    font-size: 14px;
                    line-height: 1.7;
                    color: #475569;
                    margin-bottom: 18px;
                }
                .repo-card__footer {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 16px;
                }
                .repo-path {
                    font-size: 12.5px;
                    color: #64748b;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                .repo-link {
                    font-size: 13px;
                    font-weight: 600;
                    color: #2563eb;
                    white-space: nowrap;
                }
                .repo-link:hover {
                    color: #1d4ed8;
                }
                .projects-status {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-height: 180px;
                    border: 1px solid #e2e8f0;
                    border-radius: 16px;
                    background: #ffffff;
                    text-align: center;
                    padding: 24px;
                }
                .projects-status--loading,
                .projects-status--error,
                .projects-status--empty {
                    color: #475569;
                    gap: 12px;
                    flex-direction: column;
                }
                .spinner {
                    width: 38px;
                    height: 38px;
                    border-radius: 50%;
                    border: 3px solid #dbeafe;
                    border-top-color: #2563eb;
                    animation: spin 0.85s linear infinite;
                }
                .retry-button {
                    border: 1px solid #2563eb;
                    background: #2563eb;
                    color: #ffffff;
                    border-radius: 10px;
                    padding: 10px 16px;
                    font-size: 14px;
                    font-weight: 600;
                    transition: background 0.2s ease, transform 0.15s ease;
                }
                .retry-button:hover {
                    background: #1d4ed8;
                    transform: translateY(-1px);
                }
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
                @media (max-width: 900px) {
                    .projects-grid,
                    .repo-list {
                        grid-template-columns: 1fr;
                    }
                    .live-repos__header {
                        flex-direction: column;
                        align-items: stretch;
                    }
                    .repo-search {
                        min-width: 0;
                    }
                }
                @media (max-width: 560px) {
                    .section {
                        padding: 72px 0;
                    }
                    .section > h2,
                    .projects-grid,
                    .live-repos {
                        padding-left: 20px;
                        padding-right: 20px;
                    }
                    .project-card,
                    .repo-card {
                        padding: 20px;
                    }
                    .repo-card__footer {
                        flex-direction: column;
                        align-items: flex-start;
                    }
                    .repo-path {
                        white-space: normal;
                    }
                }
            `}</style>
            <h2>Projects</h2>
            <div className="projects-grid">
                {projects.map((project) => (
                    <div className="project-card" key={project.name}>
                        <h3>{project.name}</h3>
                        <p className="project-stack">{project.stack}</p>
                        <p>{project.description}</p>
                    </div>
                ))}
            </div>

            <div className="live-repos">
                <div className="live-repos__header">
                    <div>
                        <h3>Live GitHub Repositories</h3>
                        <p>Fetched from the GitHub API for {githubUsername}.</p>
                    </div>

                    <label className="repo-search" htmlFor="repo-search">
                        <span>Search repositories</span>
                        <input
                            id="repo-search"
                            type="search"
                            placeholder="Filter by name"
                            value={searchTerm}
                            onChange={(event) => setSearchTerm(event.target.value)}
                        />
                    </label>
                </div>

                {loading ? (
                    <LoadingSpinner />
                ) : error ? (
                    <ErrorMessage message={error} onRetry={fetchRepositories} />
                ) : filteredRepos.length > 0 ? (
                    <RepositoryList repos={filteredRepos} />
                ) : (
                    <div className="projects-status projects-status--empty">
                        <p>No repositories match your search.</p>
                    </div>
                )}
            </div>
        </section>
    );
}

export default Projects;