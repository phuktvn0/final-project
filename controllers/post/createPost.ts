import express from 'express';
import createError from 'http-errors';
import httpStatus from 'http-status';
import { createPostQuerySchema } from './post.validators';
import Post from '../../models/Post';
import User from '../../models/User';

export default async function createPost(
  req: express.Request & { idUser: string },
  res: express.Response,
  next: express.NextFunction,
) {
  try {
    const { idUser } = req;

    const { error, value } = createPostQuerySchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      throw createError(httpStatus.BAD_REQUEST, error.message);
    }

    const user = await User.findById(idUser);
    if (!user) {
      throw createError(httpStatus.BAD_REQUEST, 'Login Required!');
    }
    const { name, phone, address, province } = user;
    const created = await Post.create({ ...value, idUser });
    if (!created) {
      throw createError(httpStatus[400], 'Post not create!');
    }

    const responseData = {
      data: {
        message: 'Create Post Successfully!',
        post: created,
        info: { name, phone, address, province },
      },
    };
    res.status(200).send(responseData);
  } catch (err) {
    next(err);
  }
}
