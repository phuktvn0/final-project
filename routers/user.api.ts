import express from 'express';
import {
  createUser,
  loginUser,
  searchUser,
  getMe,
  updateUser,
  deleteUser,
} from '../controllers/user/index';
import { loginRequired } from '../middlewares/authentication';

const userRouter: express.Router = express.Router();

userRouter.post('/', createUser);

userRouter.post('/login', loginUser);

userRouter.get('/', searchUser);

userRouter.get('/:id', loginRequired as any, getMe as any); //fix

userRouter.put('/:id', loginRequired as any, updateUser as any);

userRouter.delete('/:id', loginRequired as any, deleteUser as any);

export default userRouter;
