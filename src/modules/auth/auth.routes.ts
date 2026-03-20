import { Router } from "express";
import emailValidator from "@/middleware/email.middleware";
import rollValidator from "@/middleware/rollNo.middleware";
import otpValidator from "@/middleware/auth.otpValidator";
import * as authController from "@/modules/auth/auth.controller";
import { OtpChangeEmailSchema, OtpResendSchema, OtpVerifySchema } from "@/types/auth";

const router = Router();

router.post("/register", 
	emailValidator, 
	rollValidator, 
	authController.register
);
router.post("/login", 
	emailValidator, 
	authController.login
);
router.post("/otp/verification", 
    otpValidator(OtpVerifySchema),
	authController.otpVerification
);
router.post("/otp/resend",
    otpValidator(OtpResendSchema),
	authController.resendOtp
);
router.post("/otp/change-email",
    otpValidator(OtpChangeEmailSchema),
	authController.changeEmail
);
router.post("/refresh", 
	authController.refreshTokens
);

export default router;
