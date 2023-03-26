import express from 'express';
import Product from '../../models/Product';

export default async function getAllProducts(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  try {
    const pageSize: number = 12;
    const page: number = Number(req.query.pageNumber) || 1;
    const keyword: any = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: 'i',
          },
        }
      : {};
    const count: number = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort({ _id: -1 });
    res.json({ products, page, pages: Math.ceil(count / pageSize) });
  } catch (err) {
    next(err);
  }
}
