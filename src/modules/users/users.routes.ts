import { Router } from "express";
import * as userController from "@/modules/users/users.controller";
import { userAuth } from "@/middleware/user.middleware";

const router = Router();

router.use(userAuth);

router.get("/me", userController.getMe);

export default router;
