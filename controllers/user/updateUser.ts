import express from 'express';
import User from '../../models/User';
import createError from 'http-errors';
import httpStatus from 'http-status';
import { updateUserBodySchema } from './user.validators';
import generateToken from '../../helper';
import bcrypt from 'bcrypt';

export default async function updateUserById(
  req: express.Request & { user: any },
  res: express.Response,
  next: express.NextFunction,
) {
  try {
    const { error, value } = updateUserBodySchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      throw createError(httpStatus.BAD_REQUEST, error.message);
    }
    const { id } = req.params;
    const { password } = value;

    const user = await User.findById(id);

    if (!user) {
      throw createError(httpStatus.NOT_FOUND, 'User not found!');
    }

    const salt = await bcrypt.genSalt(10);
    const newPassword = await bcrypt.hash(password, salt);
    user.password = newPassword;
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } catch (err) {
    next(err);
  }
}
