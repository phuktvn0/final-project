import express from 'express';
import User from '../../models/User';
import createError from 'http-errors';
import httpStatus from 'http-status';

import { userIdParamSchema } from './user.validators';

export default async function getUsers(
  req: express.Request & { user: any },
  res: express.Response,
  next: express.NextFunction,
) {
  try {
    const { error, value } = userIdParamSchema.validate(req.params, {
      abortEarly: false,
    });
    if (error) {
      throw createError(httpStatus.BAD_REQUEST, error.message);
    }
    const { id } = value;

    const user = await User.findById(id);

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  } catch (err) {
    next(err);
  }
}
