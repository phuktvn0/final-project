import express from 'express';
import createError from 'http-errors';
import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'phuktvn';

export async function protect(
  req: express.Request & { user },
  res: express.Response,
  next: express.NextFunction,
) {
  try {
    const tokenString = req.headers.authorization;
    if (!tokenString) {
      throw createError(httpStatus[401], 'Login Required!');
    }
    const token = tokenString.replace('Bearer ', '');
    jwt.verify(token, JWT_SECRET_KEY, async (err, payload) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          throw createError(httpStatus[401], 'Token Expired!');
        } else {
          throw createError(httpStatus[401], 'Token Invalid!');
        }
      }
      const user = await User.findById((payload as jwt.JwtPayload).id);
      req.user = user;
      next();
    });
  } catch (error) {
    next(error);
  }
}

export async function admin(
  req: express.Request & { user: any },
  res: express.Response,
  next: express.NextFunction,
) {
  if (!req.user || !req.user.isAdmin) {
    return res.status(401).json({ message: 'Not authorized as an Admin' });
  }
  next();
}
