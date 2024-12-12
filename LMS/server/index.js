import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import { handleError } from "./Middleware/handleError.js";
import userRouter from "./Routes/userRoute.js";
import dotenv from "dotenv";
import adminRouter from "./Routes/adminRoute.js";
dotenv.config();

mongoose.connect(process.env.DATABASE_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  });

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use('/api/users', userRouter)
app.use('/api/admins', adminRouter)

app.use(handleError);
// Start server
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});