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

JobRoute.post('/apply/:jobId',userMiddleware,async (req, res) => {
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
      const application = job.applications.find(app => app.userId.toString() === userId);
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


JobRoute.get('/employer/applications', authMiddleware, async (req, res) => {
  try {
    const employerId = req.user.id;  // Assuming the user is an employer and their ID is in the request

    // Fetch jobs posted by the employer and populate applications' userId with user data
    const jobs = await Job.find({ employerId: employerId })
      .populate({
        path: 'applications.userId',
        model: 'Auth',   // Populate the userId field in the applications
        select: 'firstName lastName'    // Only select the fields you need
      });

    if (!jobs || jobs.length === 0) {
      return res.status(404).json({ message: "No jobs found for this employer." });
    }

    // Format the job details and applications
    const jobsWithApplications = jobs.map((job) => {
      return {
        id:job._id,
        jobTitle: job.title,
        jobDescription: job.description,
        jobStatus: job.jobstatus,
        applications: job.applications.map((application) => ({
          applicationId:application._id,
          userName: `${application.userId.firstName} ${application.userId.lastName}`,
          status: application.status,
          appliedAt: application.appliedAt,
        })),
      };
    });

    return res.status(200).json({ success: true, jobs: jobsWithApplications });
  } catch (error) {
    console.error("Error fetching job applications:", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
});


// Accept Application
JobRoute.post('/accept/:jobId/:applicationId', authMiddleware, async (req, res) => {
  console.log(req.params)
  try {
    const { jobId, applicationId } = req.params;
    const employerId = req.user.id;  // Employer's ID from the token

    // Ensure jobId is a valid ObjectId
    // if (!Types.ObjectId.isValid(jobId)) {
    //   return res.status(400).json({ message: 'Invalid jobId' });
    // }

    // Find the job by ID
    const job = await Job.findOne({ _id: jobId, employerId: employerId });

    if (!job) {
      return res.status(404).json({ message: "Job not found or you're not the employer of this job" });
    }

    // Find the application to accept
    const application = job.applications.find(app => app._id.toString() === applicationId);

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    // Update the application status to "Accepted"
    application.status = "Accepted";

    // Optionally, you can close the job once an application is accepted
    // job.jobStatus = "Closed";  // Uncomment if desired

    await job.save();  // Save the updated job

    return res.status(200).json({ message: "Application accepted successfully", job });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred while accepting the application.", error });
  }
});

// Reject Application
JobRoute.post('/reject/:jobId/:applicationId', authMiddleware, async (req, res) => {
  try {
    const { jobId, applicationId } = req.params;
    const employerId = req.user.id;  // Employer's ID from the token

    // Ensure jobId is a valid ObjectId
    // if (!mongoose.Types.ObjectId.isValid(jobId)) {
    //   return res.status(400).json({ message: 'Invalid jobId' });
    // }

    // Find the job by ID
    const job = await Job.findOne({ _id: jobId, employerId: employerId });

    if (!job) {
      return res.status(404).json({ message: "Job not found or you're not the employer of this job" });
    }

    // Find the application to reject
    const application = job.applications.find(app => app._id.toString() === applicationId);

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    // Update the application status to "Rejected"
    application.status = "Rejected";

    await job.save();  // Save the updated job

    return res.status(200).json({ message: "Application rejected successfully", job });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred while rejecting the application.", error });
  }
});





export { JobRoute };
