import Joi from "joi";

export const createCategorySchema = Joi.object({
  name: Joi.string().trim().min(1).required(),
  image: Joi.any().optional(),
  imagePublicId: Joi.string().allow(null).optional(),
});

export const updateCategorySchema = Joi.object({
  name: Joi.string().trim().min(1),
  image: Joi.any().optional(),
  imagePublicId: Joi.string().allow(null).optional(),
}).min(1);
