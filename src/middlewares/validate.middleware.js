import Joi from "joi"; // hoặc: const Joi = require("joi");

export const validate = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      success: false,
      message: "Dữ liệu không hợp lệ",
      details: error.details.map((d) => d.message),
    });
  }
  req.body = value;
  next();
};
