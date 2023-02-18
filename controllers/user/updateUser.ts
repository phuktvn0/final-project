import express from 'express';
import User from '../../models/User';
import createError from 'http-errors';
import httpStatus from 'http-status';
import { createUserBodySchema } from './user.validators';

export default async function updateUserById(
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

    const { error, value } = createUserBodySchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      throw createError(httpStatus.BAD_REQUEST, error.message);
    }

    const findUser = await User.findById(_id);
    if (!findUser || findUser.isDelete === true) {
      throw createError(httpStatus.NOT_FOUND, 'User not exists!');
    }

    const updated = await User.findByIdAndUpdate(_id, value, {
      new: true,
    });
    const responseData = {
      data: {
        message: 'Update User Successfully!',
        user: updated,
      },
    };
    res.status(200).send(responseData);
  } catch (err) {
    next(err);
  }
}
