import mongoose from "mongoose";
import asyncHandler from "../middlewares/asyncHandler.js";
import { getMaterialById, listMaterials } from "../services/material.service.js";

export const getAll = asyncHandler(async (req, res) => {
  const data = await listMaterials();
  res.json({ success: true, data });
});

export const getOne = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid id" });
  }

  const doc = await getMaterialById(id);
  if (!doc) return res.status(404).json({ success: false, message: "Material not found" });

  res.json({ success: true, data: doc });
});

