import { Router } from "express";
import Task from "../models/Task.js";
import { requireAuth } from "../middleware/auth.js";
import { validateTaskInput } from "../middleware/validateTask.js";
import cache from "../cache.js";
import taskEvents from "../events.js";

const router = Router();

// Every route below runs requireAuth first, so req.user is always set.
router.use(requireAuth);

// GET /tasks — list tasks with in-memory caching
router.get("/", async (request, response, next) => {
    try {
        const cached = cache.get("all_tasks");
        if (cached) {
            console.log("[cache] HIT: Serving tasks from memory cache");
            return response.status(200).json(cached);
        }

        console.log("[cache] MISS: Querying MongoDB for tasks");
        const tasks = await Task.find().sort({ createdAt: -1 });
        cache.set("all_tasks", tasks);
        return response.status(200).json(tasks);
    } catch (error) {
        return next(error);
    }
});

// POST /tasks — create a task, invalidate cache & emit background notification
router.post("/", validateTaskInput, async (request, response, next) => {
    try {
        const { title, description, completed } = request.body;
        const task = await Task.create({ title, description, completed });

        // Invalidate cache
        cache.del("all_tasks");
        console.log("[cache] INVALIDATED: 'all_tasks' cache cleared after POST");

        // [Step 3] Timestamp logged BEFORE the response is sent
        console.log(`[API] Response being sent at ${new Date().toISOString()} for task "${task.title}"`);

        // Send HTTP response immediately — client is unblocked right here
        response.status(201).json(task);

        // [Step 3] Emit event AFTER responding — listener's setTimeout fires ~1500ms later
        // This demonstrates that the API response is decoupled from background work
        taskEvents.emit("task-created", task, request.user);
    } catch (error) {
        return next(error);
    }
});

// PUT /tasks/:id — update a task & invalidate cache
router.put("/:id", validateTaskInput, async (request, response, next) => {
    try {
        const task = await Task.findByIdAndUpdate(request.params.id, request.body, {
            new: true,
            runValidators: true,
        });

        if (!task) {
            return response.status(404).json({ message: "Task not found." });
        }

        cache.del("all_tasks");
        console.log("[cache] INVALIDATED: 'all_tasks' cache cleared after PUT");
        return response.status(200).json(task);
    } catch (error) {
        return next(error);
    }
});

// DELETE /tasks/:id — remove a task & invalidate cache
router.delete("/:id", async (request, response, next) => {
    try {
        const task = await Task.findByIdAndDelete(request.params.id);

        if (!task) {
            return response.status(404).json({ message: "Task not found." });
        }

        cache.del("all_tasks");
        console.log("[cache] INVALIDATED: 'all_tasks' cache cleared after DELETE");
        return response.status(204).send();
    } catch (error) {
        return next(error);
    }
});

export default router;