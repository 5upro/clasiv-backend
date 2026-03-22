import { Router } from "express";
import * as roleController from "@/modules/roles/roles.controller";
import userAuth from "@/middleware/user.authentication";

const router = Router();

router.use(userAuth);

router.get("/", roleController.getRoles);

export default router;
