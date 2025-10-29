import { Router } from "express";
import { getAll, getOne, createOne, updateOne, removeOne } from "../controllers/category.controller.js";
import { uploadSingleImage } from "../middlewares/upload.middleware.js";

const router = Router();

router.get("/", getAll);
router.get("/:id", getOne);
router.post("/", uploadSingleImage, createOne);
router.patch("/:id", uploadSingleImage, updateOne); 
router.delete("/:id", removeOne);

export default router;
