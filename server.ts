// Importing module
import express from 'express';
import userRouter from './routers/user.api';

import cors from 'cors';
import createError from 'http-errors';
import httpStatus from 'http-status';

import mongoose from 'mongoose';
import { connect, disconnect } from './helper';
import orderRouter from './routers/order.api';
import productRouter from './routers/product.api';

const app: express.Application = express();
const PORT: Number = 8000;

// // connect to mongoose
mongoose.set('strictQuery', false);
connect();

// Handling GET / Request
app.get('/', (req: express.Request, res: express.Response) => {
  res.status(200).send('Welcome to typescript backend!');
});

app.use(express.static('public'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// router
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);

//customize express error handling middleware
app.use(
  (
    err: createError.HttpError,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    res
      .status(err.statusCode || httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: err.message });
  },
);

// Server setup
app.listen(PORT, () => {
  console.log(
    'The application is listening ' + 'on port http://localhost:' + PORT,
  );
});

export default app;
