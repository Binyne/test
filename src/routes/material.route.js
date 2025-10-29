import { Router } from "express";
import * as ctrl from "../controllers/material.controller.js"

const router = Router();

router.get("/", ctrl.getAll);
router.get("/:id", ctrl.getOne);

export default router;
