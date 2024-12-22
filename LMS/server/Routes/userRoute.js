import express from 'express'
import { checkEmailUser, signUpUser} from '../Controllers/signUpController.js';
import { signInUser } from '../Controllers/signInController.js';

import { verifyAdmin } from '../Middleware/verifyAdmin.js';
import { getCourseById, getCourses, getTopCoursesByEnrollment } from '../Controllers/courseController.js';
import { addToCart, getCart, removeFromCart} from '../Controllers/cartController.js';




const userRouter = express.Router();
userRouter.post('/email', checkEmailUser);
userRouter.post('/signup', signUpUser);
userRouter.post('/signin', signInUser, verifyAdmin);
userRouter.get('/courses', getCourses);
userRouter.get('/courses/:id', getCourseById);
userRouter.get('/topcourses', getTopCoursesByEnrollment);
userRouter.post('/:userId/add', addToCart);
userRouter.get('/:userId/cart', getCart);
userRouter.delete('/:userId/cart',removeFromCart);



export default userRouter;