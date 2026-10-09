import "dotenv/config";
import bcrypt from "bcryptjs";
import cors from "cors";
import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import Task from "./models/Task.js";
import User from "./models/User.js";
import { requireAuth } from "./middleware/auth.js";
import { validateTaskInput } from "./middleware/validateTask.js";
import cache from "./cache.js";
import "./listeners.js"; // Register all background event listeners
import taskEvents from "./events.js";

const app = express();
const router = express.Router();
const port = globalThis.process?.env.PORT || 5000;
const mongoUri = globalThis.process?.env.MONGO_URI;
const jwtSecret = globalThis.process?.env.JWT_SECRET;
const allowedOrigins = new Set(["http://localhost:5173", "http://127.0.0.1:5173"]);

app.use((request, response, next) => {
  const timestamp = new Date().toISOString();
  console.log(`${request.method} ${request.originalUrl} ${timestamp}`);
  next();
});

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.has(origin)) {
      return callback(null, true);
    }
    return callback(new Error("Origin is not allowed by the task API."));
  },
  credentials: true,
}));
app.use(express.json());

router.post("/register", async (request, response, next) => {
  try {
    const { email, password } = request.body || {};
    console.log("[auth] register request", { email });

    if (typeof email !== "string" || typeof password !== "string" || !email.trim() || !password) {
      return response.status(400).json({
        error: "Validation failed.",
        details: [{ field: "email/password", message: "Email and password are required." }],
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return response.status(409).json({ message: "An account with this email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email: normalizedEmail, password: hashedPassword });
    console.log("[auth] register success", { email: user.email });
    response.status(201).json({ id: user._id, email: user.email });
  } catch (error) {
    console.error("[auth] register failed", error);
    next(error);
  }
});

router.post("/login", async (request, response, next) => {
  try {
    const { email, password } = request.body || {};
    console.log("[auth] login request", { email });

    if (typeof email !== "string" || typeof password !== "string" || !email.trim() || !password) {
      return response.status(400).json({ message: "Email and password are required." });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() }).select("+password");
    const isMatch = user && (await bcrypt.compare(password, user.password));

    if (!isMatch) {
      return response.status(401).json({ message: "Invalid email or password." });
    }

    if (!jwtSecret) {
      return next(new Error("JWT_SECRET is not configured."));
    }

    const token = jwt.sign({ id: user._id.toString(), email: user.email }, jwtSecret, {
      expiresIn: "1h",
    });

    console.log("[auth] login success", { email: user.email });
    response.status(200).json({ token });
  } catch (error) {
    console.error("[auth] login failed", error);
    next(error);
  }
});

router.use("/tasks", requireAuth);

router.get("/tasks", async (request, response, next) => {
  try {
    const cached = cache.get("all_tasks");
    if (cached) {
      console.log("[cache] HIT: Serving tasks from memory cache");
      return response.status(200).json(cached);
    }

    console.log("[cache] MISS: Querying MongoDB for tasks");
    const tasks = await Task.find().sort({ createdAt: -1 });
    cache.set("all_tasks", tasks);
    response.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
});

router.post("/tasks", validateTaskInput, async (request, response, next) => {
  try {
    const task = await Task.create(request.body);

    // Invalidate cache after write
    cache.del("all_tasks");
    console.log("[cache] INVALIDATED: 'all_tasks' cache cleared after POST");

    // [Step 3] Log response timestamp BEFORE sending the response
    console.log(`[API] Response being sent at ${new Date().toISOString()} for task "${task.title}"`);

    // Send the HTTP response immediately — the client gets this right away
    response.status(201).json(task);

    // [Step 3] Emit event AFTER responding — does NOT block the client
    // EventEmitter.emit() is synchronous but the listener uses setTimeout
    // so the heavy/background work runs asynchronously after this call returns
    taskEvents.emit("task-created", task, request.user);
  } catch (error) {
    next(error);
  }
});

router.put("/tasks/:id", validateTaskInput, async (request, response, next) => {
  try {
    const task = await Task.findByIdAndUpdate(request.params.id, request.body, {
      returnDocument: "after",
      runValidators: true,
    });

    if (!task) {
      return response.status(404).json({ message: "Task not found." });
    }

    cache.del("all_tasks");
    console.log("[cache] INVALIDATED: 'all_tasks' cache cleared after PUT");
    response.status(200).json(task);
  } catch (error) {
    next(error);
  }
});

router.delete("/tasks/:id", async (request, response, next) => {
  try {
    const task = await Task.findByIdAndDelete(request.params.id);

    if (!task) {
      return response.status(404).json({ message: "Task not found." });
    }

    cache.del("all_tasks");
    console.log("[cache] INVALIDATED: 'all_tasks' cache cleared after DELETE");
    response.status(200).json(task);
  } catch (error) {
    next(error);
  }
});

app.use(router);

app.use((request, response) => {
  response.status(404).json({ message: "Route not found." });
});

app.use((error, request, response, next) => {
  void next;
  console.error("[server] request failed", error);

  if (error.message === "Origin is not allowed by the task API.") {
    return response.status(403).json({ message: error.message });
  }

  if (error.name === "ValidationError") {
    return response.status(400).json({
      error: "Validation failed.",
      details: Object.values(error.errors).map((validationError) => ({
        field: validationError.path,
        message: validationError.message,
      })),
    });
  }

  if (error.name === "CastError") {
    return response.status(404).json({ message: "Task not found." });
  }

  if (error.code === 11000) {
    return response.status(409).json({ message: "An account with this email already exists." });
  }

  response.status(500).json({ error: "Something went wrong." });
});

async function startServer() {
  if (!mongoUri) {
    throw new Error("MONGO_URI is not configured.");
  }

  if (!jwtSecret) {
    throw new Error("JWT_SECRET is not configured.");
  }

  console.log("[server] Connecting to MongoDB...");
  await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 5000 });
  console.log("MongoDB connected");
  app.listen(port, () => {
    console.log(`Task API listening on http://localhost:${port}`);
  });
}

startServer().catch((error) => {
  console.error("Unable to start server:", error.message);
  globalThis.process.exitCode = 1;
});
