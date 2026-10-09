const BASE_URL = (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(/\/+$/, "");
const TOKEN_KEY = "task-manager-token";

async function request(path, options = {}) {
  const token = localStorage.getItem(TOKEN_KEY);
  const { headers: optionHeaders, ...requestOptions } = options;
  const headers = {
    ...(options.body ? { "Content-Type": "application/json" } : {}),
    ...optionHeaders,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  try {
    console.log(`[api] ${requestOptions.method || "GET"} ${path}`);
    const response = await fetch(`${BASE_URL}${path}`, {
      ...requestOptions,
      headers,
    });
    const contentType = response.headers.get("content-type") || "";
    const data = contentType.includes("application/json")
      ? await response.json()
      : { message: await response.text() };

    if (!response.ok) {
      const validationMessage = data.details
        ?.map((detail) => detail.message)
        .join(" ");
      const error = new Error(validationMessage || data.message || data.error || "Request failed.");
      error.status = response.status;
      throw error;
    }

    console.log(`[api] ${response.status} ${path}`);
    return data;
  } catch (error) {
    console.error(`[api] ${requestOptions.method || "GET"} ${path} failed`, error);
    if (error instanceof Error && "status" in error) {
      throw error;
    }
    throw new Error("Unable to reach the task server. Start the backend and check VITE_API_URL.", { cause: error });
  }
}

export const register = async (credentials) => {
  console.log("[auth] register request", { email: credentials.email });
  const data = await request("/register", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
  console.log("[auth] register success", { email: data.email });
  return data;
};

export const login = async (credentials) => {
  console.log("[auth] login request", { email: credentials.email });
  const data = await request("/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
  if (!data.token) {
    throw new Error("Login succeeded without an authentication token.");
  }
  localStorage.setItem(TOKEN_KEY, data.token);
  console.log("[auth] login success", { email: credentials.email });
  return data;
};

export const logout = () => localStorage.removeItem(TOKEN_KEY);
export const isAuthenticated = () => Boolean(localStorage.getItem(TOKEN_KEY));

export const getTasks = () => request("/tasks");

export const createTask = (task) =>
  request("/tasks", {
    method: "POST",
    body: JSON.stringify(task),
  });

export const updateTask = (id, task) =>
  request(`/tasks/${id}`, {
    method: "PUT",
    body: JSON.stringify(task),
  });

export const deleteTask = (id) =>
  request(`/tasks/${id}`, {
    method: "DELETE",
  });
