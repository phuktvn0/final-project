import express from 'express';
import Order from '../../models/Order';
import httpStatus from 'http-status';
import createError from 'http-errors';
import { orderIdParamSchema } from './order.validators';

export default async function putDeliveredOrder(
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

    const { _id } = value;
    const order = await Order.findById(_id);
    if (order) {
      order.isDelivered = true;
      order.deliveredAt = new Date();

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404);
      throw new Error('Order Not Found');
    }
  } catch (err) {
    next(err);
  }
}
