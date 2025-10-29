import Product from "../models/product.js";

export const listProducts = () => Product.find().lean();
export const getProductById = (id) => Product.findById(id).lean();
export const createProduct = (payload) => Product.create(payload);
export const deleteProduct = (id) => Product.findByIdAndDelete(id);
export const getProductByCatId = (categoryId) => Product.find({categoryId}).populate("categoryId", "name image");
export const getProductByMaterialId = (materialId) => Product.find({materialId}).populate("materialId", "name image");
export const getProductBySexId = (sexId) => Product.find({sexId}).populate("sexId", "name image");
