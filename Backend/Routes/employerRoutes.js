import { Router } from "express";
import { Job } from "../Models/Job";

const employerRoute = Router();

employerRoute.get("/addJob", async (req, res) => {

        const { title, description, location, salary } = req.body;
      
        if (!title || !description || !location || !salary) {
          return res.status(400).json({ message: "All fields are required." });
        }
      
        try {
          const newJob = new Job({ title, description, location, salary });
          await newJob.save();
          res.status(201).json({ message: "Job created successfully!", job: newJob });
        } catch (error) {
          res.status(500).json({ message: "Error creating job", error: error.message });
        }
});
  
export { employerRoute };