import Category from "../models/category.js";

export const listCategories = () => Category.find().lean();

export const getCategoryById = (id) => Category.findById(id).lean();

export const createCategory = (payload) => Category.create(payload);

export const updateCategory = (id, payload) =>
  Category.findByIdAndUpdate(id, payload, { new: true, runValidators: true });

export const deleteCategory = (id) => Category.findByIdAndDelete(id);
