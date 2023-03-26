import Joi from 'joi';

export const createProductBodySchema = Joi.object({
  name: Joi.string().trim().required(),
  price: Joi.number().required(),
  description: Joi.string().required(),
  image: Joi.string().required(),
  countInStock: Joi.number().required(),
  color: Joi.array().required(),
  size: Joi.array().required(),
});

export const productIdParamSchema = Joi.object({
  id: Joi.string().hex().length(24),
});

export const updateProductBodySchema = Joi.object({
  name: Joi.string().trim(),
  price: Joi.number(),
  description: Joi.string(),
  image: Joi.string(),
  countInStock: Joi.number(),
  color: Joi.array(),
  size: Joi.array(),
});
