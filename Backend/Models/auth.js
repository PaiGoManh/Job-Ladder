import mongoose from "mongoose";

const AuthSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["user", "employer", "admin"],
  },
  appliedJobs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",  // Referencing the Job model
  }],
  savedJobs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",  // Referencing the Job model
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Auth = mongoose.model("Auth", AuthSchema);

export default Auth;

