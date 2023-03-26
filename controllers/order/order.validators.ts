import Joi from 'joi';

export const orderIdParamSchema = Joi.object({
  id: Joi.string().hex().length(24),
});

export const createOrderBodySchema = Joi.object({
  orderItems: Joi.array().required(),
  shippingAddress: Joi.object().required(),
  paymentMethod: Joi.string().default('Paypal').required(),
  itemsPrice: Joi.number().required(),
  taxPrice: Joi.number().required(),
  shippingPrice: Joi.number().required(),
  totalPrice: Joi.number().required(),
});
