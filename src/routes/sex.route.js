import { Router } from "express";
import * as ctrl from "../controllers/sex.controller.js"

const router = Router();

router.get("/", ctrl.getAll);
router.get("/:sexid", ctrl.getOne);

export default router;
