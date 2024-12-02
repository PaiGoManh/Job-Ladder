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
  phoneNumber: { 
    type: String, 

  },
  bio: { 
    type: String 
  },
  qualification: { 
    type: String 
  },
  location :{ 
    type:String
  },
  profilePicture: { 
    type: String 
  },
  role: {
    type: String,
    required: true,
    enum: ["user", "employer", "admin"],
  },
  appliedJobs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",  
  }],
  savedJobs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",  
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },

});

const Auth = mongoose.model("Auth", AuthSchema);

export default Auth;

