import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Auth from "../Models/auth.js";

dotenv.config();
const authRoute = Router();
const secretKey = process.env.SECRET_KEY || "yourSecretKey";


authRoute.post("/jobladderlogin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Auth.findOne({ email });
    if (!user) {
      return res.status(403).json({ message: "Email  does not exist!" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(403).json({ message: "Incorrect password!" });
    }

    const token = jwt.sign(
      { username: user.username,userId: user._id, userRole: user.role, email: user.email }, 
      secretKey,
      { expiresIn: "1h" }
    );
    console.log("Token Data {",token,"}")
    res.cookie("AuthToken", token, {
      httpOnly: true,
      secure: process.env.SECRET_KEY,
      sameSite: "lax",
    });
    
    res.status(200).json({
      token,
      userRole: user.role,
      userEmail: user.email,
      message: "Login successful!",
    });
    console.log(user.role);
    
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error during login." });
  }
});

authRoute.post("/jobladderSignup", async (req, res) => {
  try {
    const { firstName, lastName, username, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await Auth.findOne({ username });
    if (existingUser) {
      return res.status(403).json({ message: " MEMBER already exists!" });
    }

    const newUser = new Auth({
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
      role,
    });
    await newUser.save();
    res.status(201).json({ message: " successfully registered!" });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Signup error", error });
  }
});

authRoute.get("/getUserDetails", async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    const user = await Auth.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { password, ...userDetails } = user.toObject();
    res.status(200).json(userDetails);
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

authRoute.get("/employerList", async (req, res) => {
  
  try {
    const employers = await Auth.find({ role: "employer" });

    if (employers.length === 0) {
      return res.status(404).json({ message: "No employers found." });
    }

    res.status(200).json(employers);
  } catch (error) {
    console.error("Error fetching employer details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

authRoute.get("/logout", (req, res) => {
  res.clearCookie("AuthToken");
  res.status(200).send("Logout successful");
});

export { authRoute };
