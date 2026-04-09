import { Router } from "express";
import validator from "@/middleware/global.validator";
import * as authController from "@/modules/auth/auth.controller";
import { 
	LoginSchema, 
	ActivationSchema,  
} from "@/types/auth";
import {
    OtpVerifyPayloadSchema,
    OtpResendPayloadSchema,
    OtpChangeEmailPayloadSchema,
} from "@/types/otp";

const router = Router();

router.post("/activate", 
	validator(ActivationSchema),
	authController.activate
);
router.post("/login", 
    validator(LoginSchema),
	authController.login
);
router.post("/otp/verification", 
    validator(OtpVerifyPayloadSchema),
	authController.otpVerification
);
router.post("/otp/resend",
    validator(OtpResendPayloadSchema),
	authController.resendOtp
);
router.post("/otp/change-email",
    validator(OtpChangeEmailPayloadSchema),
	authController.changeEmail
);
router.post("/refresh", 
	authController.refreshTokens
);

export default router;
