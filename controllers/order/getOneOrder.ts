import express from 'express';
import Order from '../../models/Order';
import createError from 'http-errors';
import httpStatus from 'http-status';
import { orderIdParamSchema } from './order.validators';

export default async function getOneOrder(
  req: express.Request & { user: any },
  res: express.Response,
  next: express.NextFunction,
) {
  try {
    const { error, value } = orderIdParamSchema.validate(req.params, {
      abortEarly: false,
    });
    if (error) {
      throw createError(httpStatus.BAD_REQUEST, error.message);
    }
    const { id } = value;
    const order = await Order.findById(id).populate('user', 'name email');

    if (order) {
      res.json(order);
    } else {
      res.status(404);
      throw new Error('Order Not Found');
    }
  } catch (err) {
    next(err);
  }
}
