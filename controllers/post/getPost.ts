import express from 'express';
import createError from 'http-errors';
import httpStatus from 'http-status';
import { getAllPostsQuerySchema } from './post.validators';
import Post from '../../models/Post';

export default async function getPosts(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  try {
    const { error, value } = getAllPostsQuerySchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      throw createError(httpStatus.BAD_REQUEST, error.message);
    }

    const { page, limit, isDelete, ...filterValue } = value;
    let totalPosts = 0;
    let listOfPost = [];

    listOfPost = await Post.find({ ...filterValue, isDelete });

    if (listOfPost.length === 0) {
      throw createError(httpStatus.NOT_FOUND, 'Post not found!');
    }

    totalPosts = Math.ceil(listOfPost.length / limit);

    const offset: number = limit * (page - 1);
    listOfPost = listOfPost.slice(offset, offset + limit);

    const responseData = {
      data: {
        message: 'Get Post List Successfully!',
        post: listOfPost,
        page: page,
        total: totalPosts,
      },
    };

    res.status(200).send(responseData);
  } catch (err) {
    next(err);
  }
}
