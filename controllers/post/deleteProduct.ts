import express from 'express';
import Product from '../../models/Product';

export default async function deleteProduct(
  req: express.Request & { user: any },
  res: express.Response,
  next: express.NextFunction,
) {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.remove();
      res.json({ message: 'Product deleted' });
    } else {
      res.status(404);
      throw new Error('Product not Found');
    }
  } catch (err) {
    next(err);
  }
}
