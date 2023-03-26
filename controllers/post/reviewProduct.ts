import express from 'express';
import Product from '../../models/Product';

export default async function reviewProduct(
  req: express.Request & { user: any },
  res: express.Response,
  next: express.NextFunction,
) {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r: any) => r.user.toString() === req.user._id.toString(),
      );
      if (alreadyReviewed) {
        res.status(400);
        throw new Error('Product already Reviewed');
      }
      const review: object = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };
      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce((acc, item: any) => item.rating + acc, 0) /
        product.reviews.length;

      await product.save();
      res.status(201).json({ message: 'Reviewed Added' });
    } else {
      res.status(404);
      throw new Error('Product not Found');
    }
  } catch (err) {
    next(err);
  }
}
