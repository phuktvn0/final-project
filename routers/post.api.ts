import express from 'express';
import {
  createPost,
  getPosts,
  updatePost,
  deletePost,
} from '../controllers/post/index';
import { loginRequired } from '../middlewares/authentication';

const postRouter: express.Router = express.Router();

postRouter.get('/', getPosts);

postRouter.post('/', loginRequired as any, createPost as any);

postRouter.put('/:id', loginRequired as any, updatePost as any);

postRouter.delete('/:id', loginRequired as any, deletePost as any);

export default postRouter;
