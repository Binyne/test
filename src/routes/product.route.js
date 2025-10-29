import { Router } from "express";
import { validate } from "../middlewares/validate.middleware.js";
import { createProductSchema, updateProductSchema } from "../validations/product.schema.js";
import upload from "../configs/multer.js"; // upload.single('image')
import * as ctrl from "../controllers/product.controller.js";

const router = Router();

router.post("/", upload.single("image"), validate(createProductSchema), ctrl.createOne);
router.get("/", ctrl.getAll);
router.get("/:id", ctrl.getOne);
router.put("/:id", upload.single("image"), validate(updateProductSchema), ctrl.updateOne);
router.get("/category/:categoryId", ctrl.getByCategory);
router.get("/material/:materialId", ctrl.getByMaterial);
router.get("/sex/:sexId", ctrl.getBySex);
router.delete("/:id", ctrl.removeOne);

export default router;
