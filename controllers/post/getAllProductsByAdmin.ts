import express from 'express';
import Product from '../../models/Product';

export default async function getAllProductsByAdmin(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  try {
    const products = await Product.find().sort({ _id: -1 });
    res.json(products);
  } catch (err) {
    next(err);
  }
}
