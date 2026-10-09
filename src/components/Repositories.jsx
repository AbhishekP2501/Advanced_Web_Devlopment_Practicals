import { useEffect, useState } from "react";

const githubUsername = "AbhishekP2501";

export default function Repositories({ embedded = false }) {
    const [repositories, setRepositories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [submittedSearchTerm, setSubmittedSearchTerm] = useState("");
    const [repositorySearchError, setRepositorySearchError] = useState("");

    useEffect(() => {
        const loadRepositories = async () => {
            try {
                const response = await fetch(`https://api.github.com/users/${githubUsername}/repos?per_page=100&sort=updated`, {
                    headers: { Accept: "application/vnd.github+json" },
                });

                if (!response.ok) {
                    throw new Error("Unable to load GitHub repositories.");
                }

                setRepositories(await response.json());
            } catch (fetchError) {
                setError(fetchError instanceof Error ? fetchError.message : "Unable to load GitHub repositories.");
            } finally {
                setLoading(false);
            }
        };

        loadRepositories();
    }, []);

    const handleSearch = (event) => {
        event.preventDefault();
        const normalizedSearchTerm = searchTerm.trim().toLowerCase();

        if (!normalizedSearchTerm) {
            setSubmittedSearchTerm("");
            setRepositorySearchError("");
            return;
        }

        const repositoryExists = repositories.some((repository) =>
            repository.name.toLowerCase().includes(normalizedSearchTerm)
        );

        setSubmittedSearchTerm(normalizedSearchTerm);
        setRepositorySearchError(
            repositoryExists ? "" : `Repository "${searchTerm.trim()}" was not found.`
        );
    };

    const visibleRepositories = submittedSearchTerm
        ? repositories.filter((repository) =>
            repository.name.toLowerCase().includes(submittedSearchTerm)
        )
        : repositories;

    return (
        <section className={`section repositories-page${embedded ? " repositories-page--embedded" : ""}`}>
            <style>{`
                .repositories-page { padding: 92px 0; background: linear-gradient(180deg, #fff 0%, #f8fafc 100%); border-bottom: 1px solid #e2e8f0; }
                .repositories-page__inner { max-width: 1140px; margin: 0 auto; padding: 0 32px; }
                .repositories-page__heading { margin: 0 0 10px; font-family: "Lora", serif; font-size: clamp(26px, 3vw, 32px); color: #0f172a; }
                .repositories-page__intro { color: #64748b; margin: 0 0 32px; }
                .repositories-page__search { display: flex; gap: 10px; margin-bottom: 24px; }
                .repositories-page__search input { flex: 1; min-width: 0; padding: 11px 14px; border: 1px solid #cbd5e1; border-radius: 8px; color: #0f172a; font: inherit; }
                .repositories-page__search button { padding: 11px 18px; border: 0; border-radius: 8px; color: #fff; background: #2563eb; font: inherit; font-weight: 600; }
                .repositories-page__search button:hover { background: #1d4ed8; }
                .sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0; }
                .repositories-page--embedded { padding: 0 0 32px; background: transparent; border-bottom: 0; }
                .repositories-page--embedded .repositories-page__inner { padding-left: 32px; padding-right: 32px; }
                .repositories-page__grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 22px; }
                .repository-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 24px; box-shadow: 0 10px 30px -22px rgba(15, 23, 42, .35); }
                .repository-card h2 { margin: 0 0 10px; font-size: 18px; }
                .repository-card__link { color: #0f172a; text-decoration: none; }
                .repository-card__link:hover { color: #2563eb; }
                .repository-card__language { display: inline-flex; padding: 6px 12px; border-radius: 999px; color: #2563eb; background: #eff6ff; border: 1px solid #dbeafe; font-size: 12.5px; font-weight: 600; }
                .repository-card__description { color: #475569; font-size: 14.5px; line-height: 1.7; }
                .repository-message { color: #64748b; padding: 14px; border-radius: 10px; background: #f8fafc; }
                .repository-message--error { color: #b91c1c; background: #fef2f2; }
                @media (max-width: 800px) { .repositories-page__grid { grid-template-columns: 1fr; } }
                @media (max-width: 560px) { .repositories-page { padding: 72px 0; } .repositories-page--embedded { padding: 0 0 32px; } .repositories-page__inner { padding: 0 20px; } }
            `}</style>
            <div className="repositories-page__inner">
                <h1 className="repositories-page__heading">GitHub Repositories</h1>
                <p className="repositories-page__intro">My public repositories from GitHub.</p>
                <form className="repositories-page__search" onSubmit={handleSearch}>
                    <label className="sr-only" htmlFor="repository-search">Search repositories</label>
                    <input
                        id="repository-search"
                        type="search"
                        value={searchTerm}
                        onChange={(event) => {
                            setSearchTerm(event.target.value);
                            setRepositorySearchError("");
                        }}
                        placeholder="Search by repository name"
                    />
                    <button type="submit">Search</button>
                </form>
                {loading ? <p className="repository-message">Loading repositories...</p> : error ? <p className="repository-message repository-message--error" role="alert">{error}</p> : (
                    <>
                        {repositorySearchError && <p className="repository-message repository-message--error" role="alert">{repositorySearchError}</p>}
                        {!repositorySearchError && <div className="repositories-page__grid">
                            {visibleRepositories.map((repository) => (
                                <article className="repository-card" key={repository.id}>
                                    <h2><a className="repository-card__link" href={repository.html_url} target="_blank" rel="noreferrer">{repository.name}</a></h2>
                                    <p className="repository-card__language">{repository.language || "Public repository"}</p>
                                    <p className="repository-card__description">{repository.description || "Public GitHub repository by Abhishek Pitroda."}</p>
                                </article>
                            ))}
                        </div>}
                    </>
                )}
            </div>
        </section>
    );
}
