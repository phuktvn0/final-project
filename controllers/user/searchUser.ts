import express from 'express';
import User from '../../models/User';
import createError from 'http-errors';
import httpStatus from 'http-status';
import { getAllUsersQuerySchema } from './user.validators';

export default async function getAllUsers(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  try {
    const { error, value } = getAllUsersQuerySchema.validate(req.query, {
      abortEarly: false,
    });
    if (error) {
      throw createError(httpStatus.BAD_REQUEST, error.message);
    }

    const { page, limit, isDelete, ...filterValue } = value;

    let totalPages = 0;
    let listOfUser = [];

    listOfUser = await User.find({ ...filterValue, isDelete });

    if (listOfUser.length === 0) {
      throw createError(httpStatus.NOT_FOUND, 'User not found!');
    }
    totalPages = Math.ceil(listOfUser.length / limit);

    const offset: number = limit * (page - 1);
    listOfUser = listOfUser.slice(offset, offset + limit);

    const responseData = {
      data: {
        message: 'Get User List Successfully!',
        user: listOfUser,
        page: page,
        total: totalPages,
      },
    };

    res.status(200).send(responseData);
  } catch (err) {
    next(err);
  }
}
