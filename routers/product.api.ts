import express from 'express';
import {
  getAllProducts,
  getOneProduct,
  getAllProductsByAdmin,
  createProduct,
  reviewProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/post/index';
import { protect, admin } from '../middlewares/authentication';

const productRouter: express.Router = express.Router();

productRouter.get('/', getAllProducts);

productRouter.get(
  '/admin/all',
  protect as any,
  admin as any,
  getAllProductsByAdmin,
);

productRouter.get('/:id', getOneProduct);

productRouter.post('/', protect as any, admin as any, createProduct as any);

productRouter.post('/:id/review', protect as any, reviewProduct as any);

productRouter.put('/:id', protect as any, admin as any, updateProduct as any);

productRouter.delete(
  '/:id',
  protect as any,
  admin as any,
  deleteProduct as any,
);

export default productRouter;
