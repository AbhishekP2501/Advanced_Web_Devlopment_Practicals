import { startTransition, useEffect, useState } from "react";
import {
    createTask,
    deleteTask,
    getTasks,
    isAuthenticated,
    login,
    logout,
    register,
    updateTask,
} from "../api";

export default function TaskManager() {
    const [tasks, setTasks] = useState([]);
    const [form, setForm] = useState({ title: "", description: "" });
    const [loading, setLoading] = useState(isAuthenticated());
    const [saving, setSaving] = useState(false);
    const [busyTaskId, setBusyTaskId] = useState(null);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [authenticated, setAuthenticated] = useState(isAuthenticated());
    const [authMode, setAuthMode] = useState("login");
    const [credentials, setCredentials] = useState({ email: "", password: "" });

    const loadTasks = async () => {
        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const data = await getTasks();
            startTransition(() => setTasks(data));
        } catch (fetchError) {
            setError(fetchError instanceof Error ? fetchError.message : "Unable to load tasks.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (authenticated) {
            // The initial API load synchronizes component state with the backend.
            // eslint-disable-next-line react-hooks/set-state-in-effect
            loadTasks();
        }
    }, [authenticated]);

    const handleAuthSubmit = async (event) => {
        event.preventDefault();
        setSaving(true);
        setError("");
        setSuccess("");

        try {
            if (authMode === "register") {
                await register(credentials);
            }
            await login(credentials);
            setAuthenticated(true);
            setCredentials({ email: "", password: "" });
            setSuccess(authMode === "register" ? "Account created and signed in successfully." : "Signed in successfully.");
        } catch (authError) {
            setError(authError instanceof Error ? authError.message : "Unable to authenticate.");
        } finally {
            setSaving(false);
        }
    };

    const handleLogout = () => {
        logout();
        setAuthenticated(false);
        setTasks([]);
        setSuccess("");
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSaving(true);
        setError("");
        setSuccess("");

        try {
            const task = await createTask(form);
            setTasks((currentTasks) => [task, ...currentTasks]);
            setForm({ title: "", description: "" });
        } catch (submitError) {
            setError(submitError instanceof Error ? submitError.message : "Unable to create task.");
        } finally {
            setSaving(false);
        }
    };

    const handleToggle = async (task) => {
        setBusyTaskId(task._id);
        setError("");
        setSuccess("");

        try {
            const updatedTask = await updateTask(task._id, { completed: !task.completed });
            setTasks((currentTasks) => currentTasks.map((currentTask) => currentTask._id === updatedTask._id ? updatedTask : currentTask));
        } catch (updateError) {
            setError(updateError instanceof Error ? updateError.message : "Unable to update task.");
        } finally {
            setBusyTaskId(null);
        }
    };

    const handleDelete = async (taskId) => {
        setBusyTaskId(taskId);
        setError("");
        setSuccess("");

        try {
            await deleteTask(taskId);
            setTasks((currentTasks) => currentTasks.filter((task) => task._id !== taskId));
        } catch (deleteError) {
            setError(deleteError instanceof Error ? deleteError.message : "Unable to delete task.");
        } finally {
            setBusyTaskId(null);
        }
    };

    return (
        <section className="section task-manager-page">
            <style>{`
                .task-manager-page { padding: 48px 0 92px; background: linear-gradient(180deg, #fff 0%, #f8fafc 100%); border-bottom: 1px solid #e2e8f0; }
                .task-manager-page__inner { max-width: 1140px; margin: 0 auto; padding: 0 32px; }
                .task-manager-page__heading { margin: 0 0 32px; font-family: "Lora", serif; font-size: clamp(26px, 3vw, 32px); color: #0f172a; }
                .task-manager { display: grid; grid-template-columns: minmax(260px, .8fr) minmax(0, 1.2fr); gap: 28px; }
                .task-manager__intro { grid-column: 1 / -1; }
                .task-manager__intro h3 { color: #0f172a; margin: 0 0 10px; }
                .task-manager__intro p { color: #64748b; margin: 0; }
                .task-form, .task-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 24px; box-shadow: 0 10px 30px -22px rgba(15, 23, 42, .35); }
                .task-form { display: flex; flex-direction: column; gap: 14px; align-self: start; }
                .task-form label { display: flex; flex-direction: column; gap: 7px; color: #334155; font-size: 13px; font-weight: 600; }
                .task-form input, .task-form textarea { border: 1px solid #cbd5e1; border-radius: 10px; padding: 11px 12px; color: #0f172a; font: inherit; resize: vertical; }
                .task-form input:focus, .task-form textarea:focus { outline: none; border-color: #2563eb; box-shadow: 0 0 0 4px rgba(37, 99, 235, .12); }
                .auth-switch { border: 0; padding: 0; color: #2563eb; background: transparent; font: inherit; cursor: pointer; }
                .primary-button, .task-action { border: 0; border-radius: 10px; padding: 11px 15px; color: #fff; background: #2563eb; font: inherit; font-weight: 600; cursor: pointer; }
                .primary-button:disabled, .task-action:disabled { opacity: .6; cursor: wait; }
                .task-list { display: grid; gap: 14px; }
                .task-card { padding: 18px 20px; }
                .task-card__top { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; }
                .task-card h4 { margin: 0; color: #0f172a; font-size: 16px; }
                .task-card p { color: #475569; font-size: 14.5px; line-height: 1.7; }
                .task-status { display: inline-flex; align-items: center; gap: 7px; border-radius: 999px; padding: 6px 10px; font-size: 12px; font-weight: 700; white-space: nowrap; }
                .task-status::before { width: 7px; height: 7px; border-radius: 50%; content: ""; }
                .task-status--done { color: #166534; background: #dcfce7; }
                .task-status--done::before { width: auto; height: auto; background: transparent; content: "✓"; color: #16a34a; font-size: 14px; }
                .task-status--pending { color: #92400e; background: #fef3c7; }
                .task-status--pending::before { background: #f59e0b; }
                .task-card__actions { display: flex; gap: 8px; margin-top: 14px; }
                .task-action { padding: 8px 11px; font-size: 13px; }
                .task-action--delete { background: #dc2626; }
                .task-error, .task-success, .task-empty { padding: 14px; border-radius: 10px; }
                .task-error { color: #b91c1c; background: #fef2f2; }
                .task-success { color: #166534; background: #f0fdf4; }
                .task-empty { color: #64748b; background: #f8fafc; }
                @media (max-width: 800px) { .task-manager { grid-template-columns: 1fr; } .task-manager__intro { grid-column: auto; } }
                @media (max-width: 560px) { .task-manager-page { padding: 48px 0 72px; } .task-manager-page__inner { padding: 0 20px; } }
            `}</style>
            <div className="task-manager-page__inner">
                <h1 className="task-manager-page__heading">Task Manager</h1>
                <div className="task-manager">
                    <div className="task-manager__intro">
                        <h3>Task Manager</h3>
                        <p>{authenticated ? "Create, complete, and remove tasks stored in MongoDB." : "Sign in to manage your tasks."}</p>
                    </div>
                    {authenticated ? (
                        <form className="task-form" onSubmit={handleSubmit}>
                            <label htmlFor="task-title">Title<input id="task-title" required value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} /></label>
                            <label htmlFor="task-description">Description<textarea id="task-description" rows="4" value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} /></label>
                            <button className="primary-button" type="submit" disabled={saving}>{saving ? "Saving..." : "Add task"}</button>
                            <button className="auth-switch" type="button" onClick={handleLogout}>Sign out</button>
                        </form>
                    ) : (
                        <form className="task-form" onSubmit={handleAuthSubmit}>
                            <label htmlFor="auth-email">Email<input id="auth-email" type="email" required value={credentials.email} onChange={(event) => setCredentials({ ...credentials, email: event.target.value })} /></label>
                            <label htmlFor="auth-password">Password<input id="auth-password" type="password" minLength="6" required value={credentials.password} onChange={(event) => setCredentials({ ...credentials, password: event.target.value })} /></label>
                            <button className="primary-button" type="submit" disabled={saving}>{saving ? "Working..." : authMode === "login" ? "Sign in" : "Create account"}</button>
                            <button className="auth-switch" type="button" onClick={() => setAuthMode(authMode === "login" ? "register" : "login")}>{authMode === "login" ? "Need an account? Register" : "Already registered? Sign in"}</button>
                        </form>
                    )}
                    <div className="task-list" aria-live="polite">
                        {error && <p className="task-error" role="alert">{error}</p>}
                        {success && <p className="task-success" role="status">{success}</p>}
                        {loading ? <p className="task-empty">Loading tasks...</p> : tasks.length === 0 ? <p className="task-empty">No tasks yet.</p> : tasks.map((task) => (
                            <article className={`task-card${task.completed ? " task-card--done" : ""}`} key={task._id}>
                                <div className="task-card__top"><div><h4>{task.title}</h4>{task.description && <p>{task.description}</p>}</div><span className={`task-status ${task.completed ? "task-status--done" : "task-status--pending"}`}>{task.completed ? "Completed" : "Pending"}</span></div>
                                <div className="task-card__actions"><button className="task-action" type="button" disabled={busyTaskId === task._id} onClick={() => handleToggle(task)}>{task.completed ? "Mark incomplete" : "Complete"}</button><button className="task-action task-action--delete" type="button" disabled={busyTaskId === task._id} onClick={() => handleDelete(task._id)}>Delete</button></div>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
