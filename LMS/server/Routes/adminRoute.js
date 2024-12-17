import express from "express";
import { signUpAdmin } from "../Controllers/signUpController.js";

import { verifyAdmin } from "../Middleware/verifyAdmin.js";

const adminRouter = express.Router();
adminRouter.post("/signup", signUpAdmin);

adminRouter.get("/admin-dashboard", verifyAdmin);

export default adminRouter;
