import express from 'express';
import Product from '../../models/Product';
import { updateProductBodySchema } from './product.validators';
import createError from 'http-errors';
import httpStatus from 'http-status';

export default async function updateProduct(
  req: express.Request & { user: any },
  res: express.Response,
  next: express.NextFunction,
) {
  try {
    const { error, value } = updateProductBodySchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      throw createError(httpStatus.BAD_REQUEST, error.message);
    }
    const { name, price, description, image, countInStock, color, size } =
      value;

    const product = await Product.findById(req.params.id);
    if (product) {
      product.name = name || product.name;
      product.price = price || product.price;
      product.description = description || product.description;
      product.image = image || product.image;
      product.countInStock = countInStock || product.countInStock;
      product.color = color || product.color;
      product.size = size || product.size;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  } catch (err) {
    next(err);
  }
}
