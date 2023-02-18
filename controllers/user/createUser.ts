import express from 'express';
import User from '../../models/User';
import createError from 'http-errors';
import httpStatus from 'http-status';
import { createUserBodySchema } from './user.validators';
import { getCurrentDate } from '../../helper';
import bcrypt from 'bcrypt';

export default async function createUser(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  try {
    const { error, value } = createUserBodySchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      throw createError(httpStatus.BAD_REQUEST, error.message);
    }

    const email = value.email;
    const findUser = await User.findOne({ email });
    if (findUser) {
      throw createError(httpStatus.BAD_REQUEST, 'User exists!');
    }

    const password = value.password;
    const salt = await bcrypt.genSalt(10);
    value.password = await bcrypt.hash(password, salt);

    const created = await User.create({
      ...value,
      createdAt: getCurrentDate(),
      updatedAt: getCurrentDate(),
    });

    const responseData = {
      data: {
        message: 'Create User Successfully!',
        user: created,
      },
    };
    res.status(200).send(responseData);
  } catch (err) {
    next(err);
  }
}
