import express from 'express';
import Product from '../../models/Product';
import createError from 'http-errors';
import httpStatus from 'http-status';
import { productIdParamSchema } from './product.validators';

export default async function getOneProduct(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  try {
    const { error, value } = productIdParamSchema.validate(req.params, {
      abortEarly: false,
    });
    if (error) {
      throw createError(httpStatus.BAD_REQUEST, error.message);
    }

    const { id } = value;
    const product = await Product.findById(id);
    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error('Product not Found');
    }
  } catch (err) {
    next(err);
  }
}
