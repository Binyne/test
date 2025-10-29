import Material from "../models/material.js";

export const listMaterials = () => Material.find().lean();
export const getMaterialById = (id) => Material.findById(id).lean();
export const createMaterial = (payload) => Material.create(payload);
export const deleteMaterial = (id) => Material.findByIdAndDelete(id);
