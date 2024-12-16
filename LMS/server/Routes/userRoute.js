import express from 'express'
import { checkEmailUser, signUpUser} from '../Controllers/signUpController.js';
import { signInUser } from '../Controllers/signInController.js';
import { authMiddleware } from '../Middleware/authMiddleware.js';
import { verifyAdmin } from '../Middleware/verifyAdmin.js';


const userRouter = express.Router();
userRouter.post('/email', checkEmailUser);
userRouter.post('/signup', signUpUser);
userRouter.post('/signin', signInUser, authMiddleware, verifyAdmin);


export default userRouter;