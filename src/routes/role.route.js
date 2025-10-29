import { Router } from "express";
import * as ctrl from "../controllers/role.controller.js"

const router = Router();

router.get("/", ctrl.getAll);
router.get("/:roleid", ctrl.getOne);

export default router;
