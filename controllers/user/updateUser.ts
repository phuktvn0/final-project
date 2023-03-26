import express from 'express';
import User from '../../models/User';
import createError from 'http-errors';
import httpStatus from 'http-status';
import {
  createUserBodySchema,
  loginUserBodySchema,
  userIdParamSchema,
} from './user.validators';
import generateToken from '../../helper';

export default async function updateUserById(
  req: express.Request & { user: any },
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
    const { id } = req.params;
    const { email, password, name } = value;

    const user = await User.findById(id);

    if (!user) {
      throw createError(httpStatus.NOT_FOUND, 'User not found!');
    }

    if (user) {
      user.name = name || user.name;
      user.email = email || user.email;
      if (password) {
        user.password = password;
      }
      const updatedUser = await user.save();
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser._id),
      });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  } catch (err) {
    next(err);
  }
}
