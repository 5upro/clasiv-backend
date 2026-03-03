import { Router } from "express";
import * as authValidator from "@/middleware/auth.validator";
import { login, register, registerVerification } from "@/modules/auth/auth.controller";

const router = Router();

router.post("/register", authValidator.register, register);
router.post("/register/verification", authValidator.registerVerification, registerVerification);
router.post("/login", authValidator.login, login);

export default router;
