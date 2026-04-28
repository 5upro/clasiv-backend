import { Router } from "express";
import validator from "@/middleware/global.validator";
import * as authController from "@/modules/auth/auth.controller";
import { 
	ActivationInitiateSchema, 
    ActivationCompleteSchema, 
    ActivationOtpSendSchema,
    ActivationOtpVerifySchema,
    ActivationOtpResendSchema,
    ActivationOtpChangeEmailSchema,
	LoginSchema, 
} from "@/types/auth";

const router = Router();

/* Activation Routes, these routes manages the whole activation process/flow
* Initiate -> Sumbit New Data -> Verify Email -> Complete
*
* ROUTE: POST /auth/activation/initiate
* BODY: 
* {
*     userName: string,
*     password: string
* }
*/
router.post("/activation/initiate", 
	validator(ActivationInitiateSchema),
	authController.activationInitiate
);

/* ROUTE: POST /auth/activation/otp
* BODY: 
* {
*     activationSessionId: string,
*     emailId: string
* }
*/
router.post("/activation/otp", 
    validator(ActivationOtpSendSchema),
    authController.activationOtpSend
);

/* ROUTE: POST /auth/activation/otp/verify
* BODY: 
* {
*     activationSessionId: string,
*     otp: string
* }
*/
router.post("/activation/otp/verify", 
    validator(ActivationOtpVerifySchema),
    authController.activationOtpVerify
);

/* 
* ROUTE: POST /auth/activation/otp/resend
* BODY: 
* {
*     activationSessionId: string
* }
*/ 
router.post("/activation/otp/resend", 
    validator(ActivationOtpResendSchema),
    authController.activationOtpResend
);

/* ROUTE: POST /auth/activation/otp/change-email
* BODY: 
* {
*     activationSessionId: string,
*     newEmailId: string
* }
*/
router.post("/activation/otp/change-email", 
    validator(ActivationOtpChangeEmailSchema),
    authController.activationOtpChangeEmail
);

/* ROUTE: POST /auth/activation/complete
* BODY: 
* {
*     activationSessionId: string,
*     userName: string | null,
*     phoneNo: string | null,
*     emailId: string,
*     password: string
* }
*/
router.post("/activation/complete", 
    validator(ActivationCompleteSchema),
    authController.activationComplete
);

/* ROUTE: POST /auth/login
* BODY: 
* {
*     userName: string | null, [if null, emailId is required]
*     emailId: string | null, [if null, userName is required]
*     password: string
* }
*/
router.post("/login", 
    validator(LoginSchema),
	authController.login
);

/* ROUTE: POST /auth/refresh
* BODY: 
* {
*     refreshToken: string
* }
*/
router.post("/refresh", 
	authController.refreshTokens
);

export default router;
