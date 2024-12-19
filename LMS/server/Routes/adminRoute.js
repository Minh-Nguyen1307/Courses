import express from "express";
import { signUpAdmin } from "../Controllers/signUpController.js";

import { verifyAdmin } from "../Middleware/verifyAdmin.js";
import { createCourse } from "../Controllers/courseController.js";
import upload from "../Middleware/multerUpload.js";

const adminRouter = express.Router();
adminRouter.post("/signup", signUpAdmin);

adminRouter.get("/admin-dashboard", verifyAdmin);
adminRouter.post("/admin-dashboard/createCourse", upload.fields([
    { name: 'image', maxCount: 1 }, // For the image file
    { name: 'video', maxCount: 1 }, // For the video file
  ]), verifyAdmin, createCourse);

export default adminRouter;
