import express from 'express';
import User from '../../models/User';
import createError from 'http-errors';
import httpStatus from 'http-status';
import { loginUserBodySchema } from './user.validators';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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
    let { email, password, isDelete } = value;

    const user = await User.findOne({ email, isDelete });
    if (!user) {
      throw createError(httpStatus.NOT_FOUND, 'User not exists!');
    }
    // console.log(user);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw createError(httpStatus[400], 'wrong password!');
    }

    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'phu';
    const accessToken = await jwt.sign({ _id: user._id }, JWT_SECRET_KEY, {
      expiresIn: '1d',
    });

    const responseData = {
      data: {
        message: 'Login Successfully!',
        user: user,
        accessToken: accessToken,
      },
    };
    res.status(200).send(responseData);
  } catch (err) {
    // console.log(err);
    next(err);
  }
}
