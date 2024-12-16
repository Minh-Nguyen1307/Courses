import express from 'express'
import { signUpAdmin } from '../Controllers/signUpController.js';


import { authMiddleware } from '../Middleware/authMiddleware.js';
import { verifyAdmin } from '../Middleware/verifyAdmin.js';



const adminRouter = express.Router();
adminRouter.post('/signup', signUpAdmin);

adminRouter.get('/admin-dashboard', authMiddleware, verifyAdmin);


export default adminRouter;