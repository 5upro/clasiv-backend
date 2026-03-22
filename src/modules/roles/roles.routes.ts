import { Router } from "express";
import * as roleController from "@/modules/roles/roles.controller";
import userAuth from "@/middleware/user.authentication";
import validator from "@/middleware/user.validator";
import { CreateRoleSchema } from "@/types/roles";

const router = Router();

router.use(userAuth);

router.get("/", roleController.getRoles);
router.post("/", 
	validator(CreateRoleSchema),
	roleController.createRole
);

export default router;
