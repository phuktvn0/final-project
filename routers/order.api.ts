import express from 'express';
import {
  getOrder,
  getAllOrderByAdmin,
  getOneOrder,
  createOrder,
  putPayOrder,
  putDeliveredOrder,
} from '../controllers/order/index';
import { admin, protect } from '../middlewares/authentication';

const orderRouter: express.Router = express.Router();

orderRouter.get('/', protect as any, getOrder as any);

orderRouter.get('/admin/all', protect as any, admin as any, getAllOrderByAdmin);

orderRouter.get('/:id', getOneOrder as any);

orderRouter.post('/', protect as any, createOrder as any);

orderRouter.put('/:id/pay', protect as any, putPayOrder as any);

orderRouter.put('/:id/delivered', protect as any, putDeliveredOrder as any);

export default orderRouter;
