import express from 'express';
import Order from '../../models/Order';

export default async function getOrder(
  req: express.Request & { user: any },
  res: express.Response,
  next: express.NextFunction,
) {
  try {
    const order = await Order.find().populate('user', 'name email');

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
