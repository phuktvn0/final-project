import express from 'express';
import Product from '../../models/Product';

export default async function getAllProducts(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  try {
    const keyword: any = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: 'i',
          },
        }
      : {};
    const products = await Product.find({ ...keyword }).sort({ _id: -1 });
    res.json({ products });
  } catch (err) {
    next(err);
  }
}
