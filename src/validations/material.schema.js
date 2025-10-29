import Joi from "joi";

export const createMaterialSchema = Joi.object({
  name: Joi.string().trim().min(1).required(),
});

export const updateMaterialSchema = Joi.object({
  name: Joi.string().trim().min(1),
}).min(1);
