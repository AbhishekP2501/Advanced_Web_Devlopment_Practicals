import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

// POST /register
router.post("/register", async (request, response, next) => {
    try {
        const { email, password } = request.body || {};

        if (!email || !password) {
            return response.status(400).json({
                error: "Validation failed.",
                details: [
                    !email && { field: "email", message: "Email is required." },
                    !password && { field: "password", message: "Password is required." },
                ].filter(Boolean),
            });
        }

        const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
        if (existingUser) {
            return response.status(409).json({ message: "An account with this email already exists." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ email, password: hashedPassword });

        return response.status(201).json({
            id: user._id,
            email: user.email,
        });
    } catch (error) {
        // Mongoose validation errors (e.g. bad email format, short password)
        if (error.name === "ValidationError") {
            return response.status(400).json({
                error: "Validation failed.",
                details: Object.values(error.errors).map((e) => ({
                    field: e.path,
                    message: e.message,
                })),
            });
        }
        return next(error);
    }
});

// POST /login
router.post("/login", async (request, response, next) => {
    try {
        const { email, password } = request.body || {};

        if (!email || !password) {
            return response.status(400).json({ message: "Email and password are required." });
        }

        // password has `select: false` on the schema, so it must be requested explicitly
        const user = await User.findOne({ email: email.toLowerCase().trim() }).select("+password");
        if (!user) {
            return response.status(401).json({ message: "Invalid email or password." });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return response.status(401).json({ message: "Invalid email or password." });
        }

        const jwtSecret = globalThis.process?.env.JWT_SECRET;
        if (!jwtSecret) {
            return next(new Error("JWT_SECRET is not configured."));
        }

        const token = jwt.sign({ id: user._id, email: user.email }, jwtSecret, {
            expiresIn: "1h",
        });

        return response.status(200).json({ token, user: { id: user._id, email: user.email } });
    } catch (error) {
        return next(error);
    }
});

// GET /me (protected) — supplementary problem
router.get("/me", requireAuth, async (request, response, next) => {
    try {
        const user = await User.findById(request.user.id);
        if (!user) {
            return response.status(404).json({ message: "User not found." });
        }
        return response.status(200).json({ id: user._id, email: user.email });
    } catch (error) {
        return next(error);
    }
});

export default router;