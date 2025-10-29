import Joi from "joi";
const objectId = Joi.string().hex().length(24);

export const createProductSchema = Joi.object({
  name: Joi.string().trim().min(1).required(),
  price: Joi.number().positive().precision(2).required(),
  discount: Joi.number().min(0).max(100).required(),
  quantity: Joi.number().integer().min(0).required(),
  description: Joi.string().trim().min(1).required(),
  color: Joi.string().trim().min(1).required(), 
  size: Joi.number().positive().required(),
  categoryId: objectId.required(),
  materialId: objectId.required(),
  sexId: objectId.required(),
  image: Joi.any().optional(),
  imagePublicId: Joi.string().allow(null).optional(),
});

export const updateProductSchema = Joi.object({
  name: Joi.string().trim().min(1),
  price: Joi.number().positive().precision(2),
  discount: Joi.number().min(0).max(100),
  quantity: Joi.number().integer().min(0),
  description: Joi.string().trim().min(1),
  color: Joi.string().trim().min(1),
  size: Joi.number().positive(),
  categoryId: objectId,
  materialId: objectId.required(),
  sexId: objectId.required(),
  image: Joi.any().optional(),
  imagePublicId: Joi.string().allow(null).optional(),
}).min(1);
