import express from 'express';
import User from '../../models/User';
import createError from 'http-errors';
import httpStatus from 'http-status';
import { userIdParamSchema } from './user.validators';

export default async function deleteUserById(
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

    const findUser = await User.findOne({ _id, isDelete });
    if (!findUser) {
      throw createError(httpStatus.NOT_FOUND, 'User not exists!');
    } else {
      findUser.isDelete = true;
      findUser.save();
    }

    const responseData = {
      data: {
        message: 'Delete User Successfully!',
        user: findUser,
      },
    };
    res.status(200).send(responseData);
  } catch (err) {
    next(err);
  }
}
