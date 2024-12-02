import express from "express";
import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Auth from "../Models/auth.js";
import multer from "multer";
import adminMiddleware from "../Middleware/adminMiddleware.js"
import authMiddleware from "../Middleware/employerMiddleware.js";
import userMiddleware from "../Middleware/userMiddleware.js";


dotenv.config();
const authRoute = Router();
const secretKey = process.env.SECRET_KEY || "yourSecretKey";

//multer starting--------------------------------
authRoute.use('/uploads', express.static('uploads'));


const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

//multer ending------------------------------------

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

authRoute.get("/getAdminDetails", adminMiddleware, async (req, res) => {
  try {
    // Extract user ID from the middleware
    const userId = req.user.userId;

    if (!userId) {
      return res.status(400).json({ message: "User ID not found in request." });
    }
    const admin = await Auth.findById(userId).select("-password");

    if (!admin) {
      return res.status(404).json({ message: "Admin user not found." });
    }

    res.status(200).json(admin);
  } catch (error) {
    console.error("Error fetching admin details:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

authRoute.get("/getEmployerDetails", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;

    if (!userId) {
      return res.status(400).json({ message: "User ID not found in request." });
    }
    const admin = await Auth.findById(userId).select("-password");

    if (!admin) {
      return res.status(404).json({ message: "Employer user not found." });
    }

    res.status(200).json(admin);
  } catch (error) {
    console.error("Error fetching Employer details:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

authRoute.get("/getUserDetails", userMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;

    if (!userId) {
      return res.status(400).json({ message: "User ID not found in request." });
    }
    const user = await Auth.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: " user not found." });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching Employer details:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});


authRoute.post("/updateAdmin", adminMiddleware, upload.single("profilePicture"), async (req, res) => {
  try {
    const userId = req.user.userId; 
    const { firstName, lastName, username, email, phoneNumber, bio, location } = req.body;

    const updateData = { firstName, lastName, username, email, phoneNumber, bio, location };
    if (req.file) updateData.profilePicture = req.file.filename;

    const updatedUser = await Auth.findByIdAndUpdate(userId, updateData, { new: true });
    console.log("Updated User:", updatedUser);

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

authRoute.post("/updateEmployer", authMiddleware, upload.single("profilePicture"), async (req, res) => {
  try {
    const userId = req.user.userId; 
    const { firstName, lastName, username, email, phoneNumber, bio, location } = req.body;

    const updateData = { firstName, lastName, username, email, phoneNumber, bio, location };
    if (req.file) updateData.profilePicture = req.file.filename;

    const updatedUser = await Auth.findByIdAndUpdate(userId, updateData, { new: true });
    console.log("Updated User:", updatedUser);

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

authRoute.post("/updateUser", userMiddleware, upload.single("profilePicture"), async (req, res) => {
  try {
    const userId = req.user.userId; 
    const { firstName, lastName, username, email, phoneNumber, bio, location,qualification } = req.body;

    const updateData = { firstName, lastName, username, email, phoneNumber,bio, location,qualification };
    if (req.file) updateData.profilePicture = req.file.filename;

    const updatedUser = await Auth.findByIdAndUpdate(userId, updateData, { new: true });
    console.log("Updated User:", updatedUser);

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});



export { authRoute };
