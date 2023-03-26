import express from 'express';
import User from '../../models/User';
import createError from 'http-errors';
import httpStatus from 'http-status';
import { loginUserBodySchema } from './user.validators';
import bcrypt from 'bcrypt';
import generateToken from '../../helper';

export default async function loginUser(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  try {
    const { error, value } = loginUserBodySchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      throw createError(httpStatus.BAD_REQUEST, error.message);
    }
    let { email, password } = value;

    const user = await User.findOne({ email });
    if (!user) {
      throw createError(httpStatus.NOT_FOUND, 'User not exists!');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw createError(httpStatus[400], 'wrong password!');
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } catch (err) {
    // console.log(err);
    next(err);
  }
}
