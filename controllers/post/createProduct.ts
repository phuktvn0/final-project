import express from 'express';
import Product from '../../models/Product';
import createError from 'http-errors';
import httpStatus from 'http-status';
import { createProductBodySchema } from './product.validators';

export default async function createProduct(
  req: express.Request & { user: any },
  res: express.Response,
  next: express.NextFunction,
) {
  try {
    const { error, value } = createProductBodySchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      throw createError(httpStatus.BAD_REQUEST, error.message);
    }
    const { name, price, description, image, countInStock, color, size } =
      value;

    const productExist = await Product.findOne({ name });
    if (productExist) {
      res.status(400);
      throw new Error('Product name already exist');
    } else {
      const product = new Product({
        name,
        price,
        description,
        image,
        countInStock,
        color,
        size,
        user: req.user._id,
      });
      if (product) {
        const createdproduct = await product.save();
        res.status(201).json(createdproduct);
      } else {
        res.status(400);
        throw new Error('Invalid product data');
      }
    }
  } catch (err) {
    next(err);
  }
}
