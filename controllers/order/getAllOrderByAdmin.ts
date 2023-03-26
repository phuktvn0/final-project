import express from 'express';
import Order from '../../models/Order';

export default async function getAllOrderByAdmin(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  try {
    const orders = await Order.find({})
      .sort({ _id: -1 })
      .populate('user', 'id name email');
    res.json(orders);
  } catch (err) {
    next(err);
  }
}
