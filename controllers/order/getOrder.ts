import express from 'express';
import Order from '../../models/Order';

export default async function getOrder(
  req: express.Request & { user: any },
  res: express.Response,
  next: express.NextFunction,
) {
  try {
    const id = req.user._id;
    const order = await Order.find({ user: id });

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
