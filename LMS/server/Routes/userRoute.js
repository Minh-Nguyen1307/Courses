import express from 'express'
import { checkEmailUser, signUpUser} from '../Controllers/signUpController.js';
import { signInUser } from '../Controllers/signInController.js';
import { authMiddleware } from '../Middleware/authMiddleware.js';


const userRouter = express.Router();
userRouter.post('/email', checkEmailUser);
userRouter.post('/signup', signUpUser);
userRouter.get('/signin', signInUser, authMiddleware);


export default userRouter;