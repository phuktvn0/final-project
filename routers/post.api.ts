import express from 'express';
import {
  createPost,
  getAllPosts,
  updatePostById,
  deletePostById,
} from '../controllers/post/post.controllers';

const postRouter: express.Router = express.Router();

postRouter.get('/', getAllPosts);

postRouter.post('/', createPost);

postRouter.put('/:id', updatePostById);

postRouter.delete('/:id', deletePostById);

export default postRouter;
