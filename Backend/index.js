import express, { json } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { authRoute } from './Routes/authRoutes.js';
import { JobRoute } from './Routes/jobRoutes.js';
import userRoute from './Routes/userRoutes.js'; 
import path from 'path' 


dotenv.config();

const JOBLADDER2_0 = express();

JOBLADDER2_0.use(json());
JOBLADDER2_0.use(cors({
  origin: 'http://localhost:5173',  
  credentials: true
}));
JOBLADDER2_0.use(cookieParser());

//multer
const __dirname = path.dirname(new URL(import.meta.url).pathname);
JOBLADDER2_0.use('/uploads', express.static(path.join(__dirname, 'uploads')));
//mullter

// Use Routes
JOBLADDER2_0.use('/auth', authRoute);
JOBLADDER2_0.use('/job', JobRoute);
JOBLADDER2_0.use('/user', userRoute);


const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/JOBLADDER3';
mongoose.connect(MONGO_URI, {
}).then(() => {
  console.log('MongoDB connected successfully');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
  process.exit(1); 
});

const port = 8000;

JOBLADDER2_0.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
