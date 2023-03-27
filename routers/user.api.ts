import express from 'express';
import {
  createUser,
  loginUser,
  getUsers,
  updateUser,
  getAllUsers,
} from '../controllers/user/index';
import { protect } from '../middlewares/authentication';

const userRouter: express.Router = express.Router();

userRouter.get('/', protect as any, getAllUsers as any);

userRouter.get('/profile/:id', protect as any, getUsers as any);

userRouter.post('/', createUser);

userRouter.post('/login', loginUser);

userRouter.put('/profile/:id', protect as any, updateUser as any);

export default userRouter;
