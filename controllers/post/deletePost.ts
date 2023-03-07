import express from 'express';
import createError from 'http-errors';
import httpStatus from 'http-status';
import { checkIdParamSchema } from './post.validators';
import Post from '../../models/Post';
import User from '../../models/User';

export default async function deletePost(
  req: express.Request & { idUser: string },
  res: express.Response,
  next: express.NextFunction,
) {
  try {
    const { idUser } = req;

    const { error, value } = checkIdParamSchema.validate(req.params, {
      abortEarly: false,
    });
    if (error) {
      throw createError(httpStatus.BAD_REQUEST, error.message);
    }
    const { _id, isDelete } = value;

    const user = await User.findById(idUser);
    if (!user) {
      throw createError(httpStatus.BAD_REQUEST, 'Login Required!');
    }

    const findPost = await Post.findOne({ _id, isDelete });
    if (!findPost) {
      throw createError(httpStatus.NOT_FOUND, 'Post not exists!');
    } else {
      findPost.isDelete = true;
      findPost.save();
    }

    const responseData = {
      data: {
        message: 'Delete Post Successfully!',
        post: findPost,
      },
    };
    res.status(200).send(responseData);
  } catch (err) {
    next(err);
  }
}
