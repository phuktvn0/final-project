import express from 'express';
import createError from 'http-errors';
import httpStatus from 'http-status';
import { createPostQuerySchema } from './post.validators';
import Post from '../../models/Post';
import User from '../../models/User';

export default async function updatePost(
  req: express.Request & { idUser: string },
  res: express.Response,
  next: express.NextFunction,
) {
  try {
    const { _id } = req.params;
    const { idUser } = req;

    if (_id !== idUser) {
      throw createError(httpStatus.BAD_REQUEST, 'You do not have access!');
    }
    const user = await User.findById(idUser);
    if (!user) {
      throw createError(httpStatus.BAD_REQUEST, 'Login Required!');
    }

    const { error, value } = createPostQuerySchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      throw createError(httpStatus.BAD_REQUEST, error.message);
    }

    const findPost = await Post.findById(_id);
    if (!findPost) {
      throw createError(httpStatus[400], 'Post not exists!');
    }

    const post = Post.findByIdAndUpdate(_id, value, {
      new: true,
    });
    const responseData = {
      data: {
        message: 'Update Post Successfully!',
        post: post,
      },
    };
    res.status(200).send(responseData);
  } catch (err) {
    next(err);
  }
}
