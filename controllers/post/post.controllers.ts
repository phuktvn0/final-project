import express from 'express';
import createError from 'http-errors';
import httpStatus from 'http-status';
import {
  getAllPostsQuerySchema,
  createPostQuerySchema,
  checkIdParamSchema,
  updatedPostQuerySchema,
} from './post.validators';
import Post from '../../models/Post';

//Create a Post
export async function createPost(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  try {
    const { error, value } = createPostQuerySchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      throw createError(httpStatus.BAD_REQUEST, error.message);
    }

    const created = await Post.create(value);
    const responseData = {
      data: {
        message: 'Create Post Successfully!',
        post: created,
      },
    };
    res.status(200).send(responseData);
  } catch (err) {
    next(err);
  }
}

//Get all post
export async function getAllPosts(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  try {
    const { error, value } = getAllPostsQuerySchema.validate(req.query, {
      abortEarly: false,
    });
    if (error) {
      throw createError(httpStatus.BAD_REQUEST, error.message);
    }
    //mongoose query
    const { page, limit, ...filterValue } = value;

    let totalPages = 0;
    let listOfPost = [];

    listOfPost = await Post.find(filterValue);
    totalPages = Math.ceil(listOfPost.length / limit);

    const offset = limit * (page - 1);
    listOfPost = listOfPost.slice(offset, offset + limit);

    const responseData = {
      data: {
        message: 'Get Post List Successfully!',
        user: listOfPost,
        page: page,
        total: totalPages,
      },
    };

    res.status(200).send(responseData);
  } catch (err) {
    next(err);
  }
}

//Update a Post
export async function updatePostById(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  try {
    const { id } = req.params;

    const { error, value } = updatedPostQuerySchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      throw createError(httpStatus.BAD_REQUEST, error.message);
    }

    const { idUser } = value;

    const updated = await Post.findByIdAndUpdate(id, value, {
      new: true,
    });
    const responseData = {
      data: {
        message: 'Update Post Successfully!',
        post: updated,
      },
    };
    return res.status(200).send(responseData);
  } catch (err) {
    next(err);
  }
}

//Delete post
export async function deletePostById(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  try {
    const { error, value } = checkIdParamSchema.validate(req.params);
    if (error) {
      throw createError(httpStatus.BAD_REQUEST, error.message);
    }
    const { id } = value;

    const findUser = await Post.findById(id);
    if (!findUser) {
      throw createError(httpStatus.NOT_FOUND, 'User not exists!');
    }
    //mongoose query
    const target = await Post.findByIdAndDelete(id, { new: true });

    const responseData = {
      data: {
        message: 'Delete Post Successfully!',
        post: target,
      },
    };
    res.status(200).send(responseData);
  } catch (err) {
    next(err);
  }
}
