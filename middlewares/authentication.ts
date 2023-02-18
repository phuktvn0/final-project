import express from 'express';
import createError from 'http-errors';
import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'phu';

export async function loginRequired(
  req: express.Request & { idUser: string },
  res: express.Response,
  next: express.NextFunction,
) {
  try {
    const tokenString = req.headers.authorization;
    if (!tokenString) {
      throw createError(httpStatus[401], 'Login Required!');
    }
    const token = tokenString.replace('Bearer ', '');
    jwt.verify(token, JWT_SECRET_KEY, (err, payload) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          throw createError(httpStatus[401], 'Token Expired!');
        } else {
          throw createError(httpStatus[401], 'Token Invalid!');
        }
      }
      req.idUser = (payload as jwt.JwtPayload)._id;
    });
    next();
  } catch (error) {
    next(error);
  }
}
