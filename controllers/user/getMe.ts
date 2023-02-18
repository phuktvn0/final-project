import express from 'express';
import User from '../../models/User';
import createError from 'http-errors';
import httpStatus from 'http-status';
import { userIdParamSchema } from './user.validators';

export default async function getMe(
  req: express.Request & { idUser: string },
  res: express.Response,
  next: express.NextFunction,
) {
  try {
    const { error, value } = userIdParamSchema.validate(req.params);
    if (error) {
      throw createError(httpStatus.BAD_REQUEST, error.message);
    }
    const { _id, isDelete } = value;
    const { idUser } = req;

    if (_id !== idUser) {
      throw createError(httpStatus.BAD_REQUEST, 'You do not have access!');
    }

    const findUser = await User.find({ _id, isDelete });
    // console.log(findUser);
    if (findUser.length === 0) {
      throw createError(httpStatus.NOT_FOUND, 'User not exists!');
    }

    const responseData = {
      data: {
        message: 'Get Info User Successfully!',
        user: findUser,
      },
    };
    res.status(200).send(responseData);
  } catch (err) {
    next(err);
  }
}
