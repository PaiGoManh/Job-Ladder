import Job from "../Models/Job.js"; 
import express from "express";
import dotenv from "dotenv";
import authMiddleware from "../Middleware/employerMiddleware.js";
import userMiddleware from "../Middleware/userMiddleware.js";

dotenv.config()

const JobRoute = express.Router();


JobRoute.post("/addJob", authMiddleware, async (req, res) => {
  const { title, description, jobtype, salary, vacancy, courseCriteria } = req.body;

  console.log("Employer ID from authMiddleware:", req.user.userId); // Debugging

  if (!title || !description || !jobtype || !salary || !vacancy || !courseCriteria) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const newJob = new Job({
      title,
      description,
      jobtype,
      salary,
      vacancy,
      courseCriteria,
      employerId: req.user.userId, // Use userId from token payload
    });

    await newJob.save();
    res.status(201).json({ message: "Job created successfully!", job: newJob });
  } catch (error) {
    console.error("Error during job creation:", error); // Log error details
    res.status(500).json({ message: "Error creating job", error: error.message });
  }
});


  
  


// View All Jobs
JobRoute.get("/view", async (req, res) => {
    try {
        const jobs = await Job.find().populate('employerId', 'name');  
        res.status(200).json(jobs);
      } catch (error) {
        res.status(500).json({ message: "Error fetching jobs", error: error.message });
      }
    });

// Edit Job
JobRoute.post("/edit/:_id", authMiddleware, async (req, res) => {
    console.log("User ID from token:", req.user._id);
    console.log("Job ID from URL:", req.params._id);
  
    try {
      const job = await Job.findOneAndUpdate(
        { _id: req.params._id, employerId: req.user.userId, },
        req.body,
        { new: true }
      );
  
      if (!job) return res.status(403).json({ message: "Unauthorized or job not found" });
  
      res.status(200).json({ message: "Job updated successfully", job });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error updating job", error });
    }
  });
  

// Delete Job
JobRoute.delete("/delete/:_id", authMiddleware, async (req, res) => {
    try {
        const job = await Job.findOneAndDelete({ _id: req.params._id, employerId: req.user._id });
        
        if (!job) return res.status(403).json({ message: "Unauthorized or job not found" });

        res.status(200).json({ message: "Job deleted successfully" });
    } catch (error) {
        console.error(error); // Add error logging to the console for better insight
        res.status(500).json({ message: "Error deleting job", error });
    }
});

JobRoute.post('/apply/:jobId', userMiddleware, async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const userId = req.user.userId;

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    if (job.jobstatus === "Closed") {
      return res.status(400).json({ message: "Job is no longer available for application" });
    }

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }
    

    const validApplications = job.applications.filter((application) => application.userId);
    const hasApplied = validApplications.some(
        (application) => application.userId === userId
      );

    if (hasApplied) {
      return res.status(400).json({ message: "You have already applied for this job" });
    }

    job.applications.push({
      userId,
      status: "Applied",
      appliedAt: new Date(),
    });

    job.vacancy -= 1;
    if (job.vacancy === 0) {
      job.jobstatus = "Closed";
    }

    await job.save();

    return res.status(200).json({ message: "Job applied successfully", job });
  } catch (error) {
    console.error("Error applying for job:", error);
    return res.status(500).json({ message: "An error occurred while applying for the job." });
  }
});

JobRoute.get("/jobs", userMiddleware, async (req, res) => {
  try {
    const userId = req.user.id; // Extract user ID from the authenticated user
    const jobs = await Job.find().populate("applications.userId", "name"); // Populate user details if needed

    const jobsWithStatus = jobs.map((job) => {
      // Determine the application status for the current user
      const application = job.applications.find(
        (app) => app.userId === userId
      );
      return {
        ...job._doc, // Include all existing job fields
        applicationStatus: application ? application.status : "Not Applied",
      };
    });

    res.status(200).json(jobsWithStatus);
  } catch (error) {
    console.error("Error fetching jobs:", error.message);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});




JobRoute.get("/applied", userMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;  // Extract userId from the authenticated user

    // Find jobs where the current user has applied
    const jobs = await Job.find({
      "applications.userId": userId
    });

    if (!jobs.length) {
      return res.status(404).json({ message: "No jobs found for the user" });
    }

    // Map over jobs to include application details for the user
    const jobsWithApplicationDetails = jobs.map(job => {
      const application = job.applications.find(app => app.userId === userId);
      return {
        ...job.toObject(),
        applicationStatus: application.status,
        appliedAt: application.appliedAt,
      };
    });

    res.status(200).json({ success: true, data: jobsWithApplicationDetails });
  } catch (error) {
    console.error("Error fetching applied jobs:", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
});

JobRoute.post('/:status/:jobId/:applicationId', authMiddleware, async (req, res) => {
  const { status, jobId, applicationId } = req.params;

  try {
    // Validate status
    const validStatuses = ['accepted', 'rejected', 'pending'];
    if (!validStatuses.includes(status.toLowerCase())) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    // Find the job and application
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    const application = job.applications.id(applicationId); // Access subdocument by ID
    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    // Update the application status
    application.status = status.toLowerCase();
    await job.save(); // Save changes to the database

    return res.status(200).json({ success: true, message: 'Application status updated successfully' });
  } catch (error) {
    console.error('Error updating application status:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

JobRoute.get('/applications', authMiddleware, async (req, res) => {
  try {
    const employerId = req.user.id;

    const jobs = await Job.find({ employerId })
      .populate({
        path: 'applications.userId',
        model: 'Auth',
        select: 'firstName lastName',
      });

    if (!jobs || jobs.length === 0) {
      return res.status(404).json({ message: 'No jobs found for this employer.' });
    }

    const jobsWithApplications = jobs.map((job) => ({
      id: job._id,
      jobTitle: job.title,
      jobDescription: job.description,
      jobStatus: job.jobStatus,
      applications: job.applications.map((application) => ({
        applicationId: application._id,
        userName: `${application.userId.firstName} ${application.userId.lastName}`,
        status: application.status,
        appliedAt: application.appliedAt,
      })),
    }));

    return res.status(200).json({ success: true, jobs: jobsWithApplications });
  } catch (error) {
    console.error('Error fetching job applications:', error);
    return res.status(500).json({ message: 'Internal server error', error });
  }
});

// Accept application
JobRoute.post('/accept/:jobId/:applicationId', authMiddleware, async (req, res) => {
  try {
    const { jobId, applicationId } = req.params;
    const employerId = req.user.id;

    const job = await Job.findOne({ _id: jobId, employerId });

    if (!job) {
      return res.status(404).json({ message: 'Job not found or unauthorized access.' });
    }

    const application = job.applications.find((app) => app._id.toString() === applicationId);

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    application.status = 'Accepted';
    await job.save();

    return res.status(200).json({ message: 'Application accepted successfully', job });
  } catch (error) {
    console.error('Error accepting application:', error);
    return res.status(500).json({ message: 'An error occurred.', error });
  }
});

// Reject application
JobRoute.post('/reject/:jobId/:applicationId', authMiddleware, async (req, res) => {
  try {
    const { jobId, applicationId } = req.params;
    const employerId = req.user.id;

    const job = await Job.findOne({ _id: jobId, employerId });

    if (!job) {
      return res.status(404).json({ message: 'Job not found or unauthorized access.' });
    }

    const application = job.applications.find((app) => app._id.toString() === applicationId);

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    application.status = 'Rejected';
    await job.save();

    return res.status(200).json({ message: 'Application rejected successfully', job });
  } catch (error) {
    console.error('Error rejecting application:', error);
    return res.status(500).json({ message: 'An error occurred.', error });
  }
});






export { JobRoute };
