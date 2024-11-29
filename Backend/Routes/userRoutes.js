import express from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import Auth  from "../Models/auth.js";  // Import Auth model
import Job from "../Models/Job.js";
import { userMiddleware } from "../Middleware/userMiddleware.js";



dotenv.config();

const userRoute = express.Router();

// Apply to a job
userRoute.post('/apply/:jobId',userMiddleware,async (req, res) => {
    try {
        const jobId = req.params.jobId;
        const userId = req.user.id; // Assuming you have the user ID in the request (from authentication)
        
        // Find the job by ID
        const job = await Job.findById(jobId);
        
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        // Check if the job is already closed or selected
        if (job.jobstatus === "Closed") {
            return res.status(400).json({ message: "Job is no longer available for application" });
        }

        // Check if the user has already applied
        const hasApplied = job.applications.some(application => application.userId.toString() === userId);
        if (hasApplied) {
            return res.status(400).json({ message: "You have already applied for this job" });
        }

        // Add the user's application to the job
        job.applications.push({
            userId,
            status: "Applied",
            appliedAt: new Date(),
        });

        // Decrease the vacancy count
        job.vacancy -= 1;

        // If vacancy reaches 0, update job status to "Closed"
        if (job.vacancy === 0) {
            job.jobstatus = "Closed";
        }

        // Save the updated job document
        await job.save();

        // Respond with success
        return res.status(200).json({ message: "Job applied successfully", job });
    } catch (error) {
        console.error("Error applying for job:", error);
        return res.status(500).json({ message: "An error occurred while applying for the job." });
    }
});


// Save a job
userRoute.post("/save/:jobId", async (req, res) => {
  const { jobId } = req.params;
  const token = req.headers.authorization?.split(" ")[1];  // Extracting token from Authorization header

  if (!token) {
    return res.status(400).json({ message: "Token is missing" });
  }

  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);  // Make sure to replace with your secret key
    console.log("Decoded Token:", decoded);  // Debugging log

    const userId = decoded.userId;  // Corrected field to extract userId

    // Find the user by their ID in the Auth model
    const user = await Auth.findById(userId);
    if (!user) {
      console.error("User not found with ID:", userId);  // Debugging log
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the user has already saved the job
    if (user.savedJobs.includes(jobId)) {
      return res.status(400).json({ message: "Job already saved" });
    }

    // Add the job to the savedJobs array in Auth model
    user.savedJobs.push(jobId);
    await user.save();

    res.json({ message: "Job saved successfully", savedJobs: user.savedJobs });
  } catch (error) {
    console.error("Error in saving job:", error);  // Debugging log
    res.status(500).json({ message: "Error saving job", error: error.message });
  }
});


userRoute.get("/jobs", async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];  // Extracting token from Authorization header
  
    if (!token) {
      return res.status(400).json({ message: "Token is missing" });
    }
  
    try {
      // Verify and decode the token
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      const userId = decoded.userId;  // Extract the userId from the decoded token
  
      // Find the user by their ID in the Auth model and populate the applied and saved jobs
      const user = await Auth.findById(userId)
        .populate("appliedJobs savedJobs");  // Populate job details
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Return the applied and saved jobs with detailed job information
      const appliedJobs = await Job.find({ _id: { $in: user.appliedJobs } });
      const savedJobs = await Job.find({ _id: { $in: user.savedJobs } });
  
      res.json({ appliedJobs, savedJobs });
    } catch (error) {
      console.error("Error fetching jobs:", error);
      res.status(500).json({ message: "Error fetching jobs", error: error.message });
    }
  });

export default userRoute;
