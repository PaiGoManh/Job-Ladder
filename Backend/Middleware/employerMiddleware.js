import jwt from "jsonwebtoken";
import Auth  from "../Models/auth.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];  // Extract the token from the Authorization header

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);  // Verify and decode the token

    const user = await Auth.findById(decoded.userId);  // Find the user by ID

    if (!user || user.role !== "employer") {
      return res.status(403).json({ message: "Access denied. Only employers are allowed." });
    }

    req.user = user;  // Attach the user to the request object
    next();  // Continue to the next middleware or route handler
  } catch (error) {
    res.status(401).json({ message: "Invalid token", error });
  }
};
