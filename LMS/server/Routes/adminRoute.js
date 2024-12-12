import express from 'express'
import { signUpAdmin } from '../Controllers/signUpController.js';
import { signInUser } from '../Controllers/signInController.js';
import { isAdmin } from '../Middleware/isAdmin.js';
import { authMiddleware } from '../Middleware/authMiddleware.js';



const adminRouter = express.Router();
adminRouter.post('/signup', signUpAdmin);
adminRouter.get('/signin', signInUser, authMiddleware);



export default adminRouter;