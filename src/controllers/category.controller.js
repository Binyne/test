import asyncHandler from "../middlewares/asyncHandler.js";
import { createCategorySchema, updateCategorySchema } from "../validations/category.schema.js";
import { listCategories, getCategoryById, createCategory, updateCategory, deleteCategory } from "../services/category.service.js";
import cloudinary from "../configs/cloudinary.js";
import fs from "fs";
import mongoose from "mongoose";

export const getAll = asyncHandler(async (req, res) => {
  const data = await listCategories();
  res.json({ success: true, data });
});

export const getOne = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid id" });
  }

  const doc = await getCategoryById(id);
  if (!doc) return res.status(404).json({ success: false, message: "Category not found" });

  res.json({ success: true, data: doc });
});

export const createOne = asyncHandler(async (req, res) => {
  // validate body
  const { error, value } = createCategorySchema.validate(req.body);
  if (error) return res.status(400).json({ success: false, message: error.message });

  // kiểm tra file
  if (!req.file?.path) {
    return res.status(400).json({ success: false, message: "Thiếu image (form-data key: image)" });
  }

  // upload cloudinary
  const up = await cloudinary.uploader.upload(req.file.path, { folder: "shop/categories" });

  // xóa file tạm (không chặn luồng nếu lỗi xóa)
  fs.unlink(req.file.path, () => {});

  const doc = await createCategory({ name: value.name, image: up.secure_url, imagePublicId: up.public_id });
  res.status(201).json({ success: true, data: doc });
});

export const updateOne = asyncHandler(async (req, res) => {
  // validate phần text
  const { error, value } = updateCategorySchema.validate(req.body);
  if (error) return res.status(400).json({ success: false, message: error.message });

  const exist = await getCategoryById(req.params.id);
  if (!exist) return res.status(404).json({ success: false, message: "Category not found" });

  const payload = { ...value };


  if (req.file?.path) {
    const up = await cloudinary.uploader.upload(req.file.path, { folder: "shop/categories" });
    fs.unlink(req.file.path, () => {});
    payload.image = up.secure_url;
    payload.imagePublicId = up.public_id;

    
    if (exist.imagePublicId) {
      try { await cloudinary.uploader.destroy(exist.imagePublicId); } catch (e) { /* không chặn luồng */ }
    }
  }

  const updated = await updateCategory(req.params.id, payload);
  res.json({ success: true, data: updated });
});

export const removeOne = asyncHandler(async (req, res) => {
  const exist = await getCategoryById(req.params.id);
  if (!exist) return res.status(404).json({ success: false, message: "Category not found" });

  
  if (exist.imagePublicId) {
    try { await cloudinary.uploader.destroy(exist.imagePublicId); } catch (e) {}
  }

  await deleteCategory(req.params.id);
  res.json({ success: true, message: "Deleted" });
});