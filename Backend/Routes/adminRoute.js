// import express from "express";
// import dotenv from "dotenv";
// import multer from 'multer';
// import Admin from '../Models/adminSettings.js'
// import { adminMiddleware } from "../Middleware/adminMiddleware.js";
// dotenv.config();

// const router = express.Router();

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, "uploads/"),
//   filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
// });
// const upload = multer({ storage });

// router.post("/updateAdmin",adminMiddleware, upload.single("profilePicture"), async (req, res) => {
//   try {
//     const userId = req.user.id; // Assuming authentication middleware sets req.user
//     const { firstName, lastName, username, email, phoneNumber, bio, location } = req.body;

//     const updateData = { firstName, lastName, username, email, phoneNumber, bio, location };
//     if (req.file) updateData.profilePicture = req.file.filename;

//     const updatedUser = await Admin.findByIdAndUpdate(userId, updateData, { new: true });
//     res.status(200).json({ message: "Profile updated successfully", user: updatedUser });
//   } catch (error) {
//     console.error("Error updating profile:", error);
//     res.status(500).json({ message: "Internal Server Error", error: error.message });
//   }
// });

// export default router;
