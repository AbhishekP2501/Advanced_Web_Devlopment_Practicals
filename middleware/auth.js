import jwt from "jsonwebtoken";

const jwtSecret = globalThis.process?.env.JWT_SECRET;

export function requireAuth(request, response, next) {
  const authorization = request.headers.authorization;
  const token = authorization?.startsWith("Bearer ")
    ? authorization.slice(7)
    : null;

  if (!token) {
    return response.status(401).json({ message: "Authentication token required." });
  }

  if (!jwtSecret) {
    return next(new Error("JWT_SECRET is not configured."));
  }

  try {
    request.user = jwt.verify(token, jwtSecret);
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return response.status(401).json({ message: "Authentication token expired." });
    }

    return response.status(401).json({ message: "Invalid authentication token." });
  }
}
