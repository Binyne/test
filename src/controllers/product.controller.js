import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/product.js";
import cloudinary from "../configs/cloudinary.js";
import fs from "fs";
import { createProductSchema, updateProductSchema } from "../validations/product.schema.js";
import { getProductByCatId, getProductById, getProductByMaterialId, getProductBySexId } from "../services/product.service.js";

export const createOne = asyncHandler(async (req, res) => {
  const { error, value } = createProductSchema.validate(req.body);
  if (error) return res.status(400).json({ success: false, message: error.message });

  if (!req.file?.path) {
    return res.status(400).json({ success: false, message: "Thiếu image (form-data key: image)" });
  }

  const up = await cloudinary.uploader.upload(req.file.path, { folder: "shop/products" });
  fs.unlink(req.file.path, () => {});

  const doc = await Product.create({
    ...value,
    image: up.secure_url,
    imagePublicId: up.public_id,
  });

  res.status(201).json({ success: true, data: doc });
});

// GET /products?categoryId=xxxx
export const getAll = asyncHandler(async (req, res) => {
  const { categoryId } = req.query;
  const filter = {};
  if (categoryId) filter.categoryId = categoryId;

  const docs = await Product.find(filter)
    .populate("materialId", "name image")
    .populate("categoryId", "name image")
    .sort({ createdAt: -1 });

  res.json({ success: true, data: docs });
});

export const getOne = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const doc = await getProductById(id)
                    .populate("materialId", "name image")
                    .populate("categoryId", "name image")
                    .sort({createdAt:-1});
  if (!doc) return res.status(404).json({ success: false, message: "Không tìm thấy sản phẩm" });
  res.json({ success: true, data: doc });
});

export const updateOne = asyncHandler(async (req, res) => {
  const { error, value } = updateProductSchema.validate(req.body);
  if (error) return res.status(400).json({ success: false, message: error.message });

  const doc = await Product.findById(req.params.id);
  if (!doc) return res.status(404).json({ success: false, message: "Không tìm thấy sản phẩm" });

  // ảnh mới?
  if (req.file?.path) {
    const up = await cloudinary.uploader.upload(req.file.path, { folder: "shop/products" });
    fs.unlink(req.file.path, () => {});
    if (doc.imagePublicId) await cloudinary.uploader.destroy(doc.imagePublicId).catch(() => {});
    doc.image = up.secure_url;
    doc.imagePublicId = up.public_id;
  }

  // gán các field còn lại
  doc.name = value.name ?? doc.name;
  doc.price = value.price ?? doc.price;
  doc.discount = value.discount ?? doc.discount;
  doc.quantity = value.quantity ?? doc.quantity;
  doc.description = value.description ?? doc.description;
  doc.color = value.color ?? doc.color;
  doc.size = value.size ?? doc.size;
  doc.categoryId = value.categoryId ?? doc.categoryId;

  await doc.save();
  res.json({ success: true, data: doc });
});

export const getByCategory = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;
  const docs = await getProductByCatId(categoryId)
  res.json({ success: true, data: docs });
});

export const getByMaterial = asyncHandler(async(req,res) => {
  const { materialId } = req.params;
  const docs = await getProductByMaterialId(materialId);
  res.json({ success: true, data: docs});
});
export const getBySex = asyncHandler(async(req, res) => {
  const { sexId } = req.params;
  const docs = await getProductBySexId(sexId);
  res.json({success: true, data: docs});
})

export const removeOne = asyncHandler(async (req, res) => {
  const doc = await Product.findById(req.params.id);
  if (!doc) return res.status(404).json({ success: false, message: "Không tìm thấy sản phẩm" });

  if (doc.imagePublicId) await cloudinary.uploader.destroy(doc.imagePublicId).catch(() => {});
  await doc.deleteOne();

  res.json({ success: true, message: "Đã xoá sản phẩm" });
});
