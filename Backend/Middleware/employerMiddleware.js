import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const secretKey = process.env.SECRET_KEY || "yourSecretKey";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, secretKey);
    console.log("Decoded token:", decoded); // Debugging

    // Ensure the role is employer
    if (decoded.userRole !== "employer") {
      return res.status(403).json({ message: "Forbidden: Employer access only" });
    }

    req.user = decoded; // Attach user info to the request object
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

export default authMiddleware;
