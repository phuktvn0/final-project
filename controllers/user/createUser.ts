import express from 'express';
import User from '../../models/User';
import createError from 'http-errors';
import httpStatus from 'http-status';
import { createUserBodySchema } from './user.validators';
import generateToken, { getCurrentDate } from '../../helper';
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

    const { email, password } = value;
    const findUser = await User.findOne({ email });
    if (findUser) {
      throw createError(httpStatus.BAD_REQUEST, 'User already exists!');
    }

    const salt = await bcrypt.genSalt(10);
    value.password = await bcrypt.hash(password, salt);

    const user = await User.create({
      ...value,
      createdAt: getCurrentDate(),
      updatedAt: getCurrentDate(),
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error('Invalid User Data');
    }
  } catch (err) {
    next(err);
  }
}
