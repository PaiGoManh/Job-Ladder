import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  jobtype: {
    type: String,
    required: true,
    enum: ["Remote", "On-Site"],
  },
  salary: {
    type: Number,
    required: true,
  },
  employerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Auth",  
    required: true,
  },
  jobstatus: {
    type: String,
    required: true,
    enum: ["Active", "Closed", "Pending"],  
    default: "Active",
  },
  vacancy: {
    type: Number,
    required: true,
  },
  courseCriteria: {
    type: String,
    required: true,
  },
  applications: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",  
      required: true,
    },
    status: {
      type: String,
      enum: ["Applied", "Shortlisted", "Interviewed", "Rejected", "Accepted"],  
      default: "Applied",
    },
    appliedAt: {
      type: Date,
      default: Date.now,
    },
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Job = mongoose.model("Job", JobSchema);
export default Job;
