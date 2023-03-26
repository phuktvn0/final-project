import express from 'express';
import createError from 'http-errors';
import httpStatus from 'http-status';
import User from '../../models/User';

export default async function getAllUsers(
  req: express.Request & { user: any },
  res: express.Response,
  next: express.NextFunction,
) {
  try {
    const user = req.user;
    if (user.isAdmin === false) {
      throw createError(httpStatus.BAD_REQUEST, 'You do not have access!');
    }
    const users = await User.find({});
    res.json({ users });
  } catch (err) {
    next(err);
  }
}
