import Joi from 'joi';

export const getAllPostsQuerySchema = Joi.object({
  page: Joi.number().default(1),
  limit: Joi.number().default(10),
  title: Joi.string().uppercase().trim(),
  isDelete: Joi.boolean().default(false),
  type: Joi.string().hex().length(24),
  idUser: Joi.string().hex().length(24),
});

export const createPostQuerySchema = Joi.object({
  title: Joi.string().trim().required(),
  description: Joi.string().trim().required(),
  type: Joi.string().required(),
  url: Joi.array<string>().required(),
  price: Joi.number().required(),
  idUser: Joi.string().hex().length(24),
  isDelete: Joi.boolean().default(false),
});

export const checkIdParamSchema = Joi.object({
  id: Joi.string().hex().length(24),
  isDelete: Joi.boolean().default(false),
});
