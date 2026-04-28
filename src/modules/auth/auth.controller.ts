import type { 
	Request, 
	Response 
} from "express";
import * as authService from "@/modules/auth/auth.service";

/* Activation Routes, these routes manages the whole activation process/flow
* Initiate -> Sumbit New Data -> Verify Email -> Complete
*
* ROUTE: POST /auth/activation/initiate
* BODY: 
* {
*     message: string,
*     activationSessionId: string,
*     user: {
*         fullName: string,
*         userName: string,
*         phoneNo: string,
*         emailId: string
*     }
* }
*/
export const activationInitiate = async (req: Request, res: Response) => {
	try {
		const { activationSessionId, user } = await authService.activationInitiate(req.body);
		res.status(200).json({ 
			message: "Account found!",
			activationSessionId,
            user
		});
	} catch (error) {
		if (error instanceof Error) {
			return res.status(400).json({ message: error.message });
		}
		return res.status(500).json({ message: "Unknown error" });
	}
}

/* ROUTE: POST /auth/activation/otp
* BODY: 
* {
*     message: string
* }
*/
export const activationOtpSend = async (req: Request, res: Response) => {
	try {
		await authService.activationOtpSend(req.body);
		res.status(200).json({ 
			message: "OTP sent!",
		});
	} catch (error) {
		if (error instanceof Error) {
			return res.status(400).json({ message: error.message });
		}
		return res.status(500).json({ message: "Unknown error" });
	}
}

/* ROUTE: POST /auth/activation/otp/verify
* BODY: 
* {
*     message: string
* }
*/
export const activationOtpVerify = async (req: Request, res: Response) => {
	try {
		await authService.activationOtpVerify(req.body);
		res.status(200).json({ 
			message: "Email verified successfully!",
		});
	} catch (error) {
		if (error instanceof Error) {
			return res.status(400).json({ message: error.message });
		}
		return res.status(500).json({ message: "Unknown error" });
	}
}

/* 
* ROUTE: POST /auth/activation/otp/resend
* BODY: 
* {
*     message: string
* }
*/ 
export const activationOtpResend = async (req: Request, res: Response) => {
	try {
		await authService.activationOtpResend(req.body);
		res.status(200).json({ 
			message: "OTP resent!",
		});
	} catch (error) {
		if (error instanceof Error) {
			return res.status(400).json({ message: error.message });
		}
		return res.status(500).json({ message: "Unknown error" });
	}
}

/* ROUTE: POST /auth/activation/otp/change-email
* BODY: 
* {
*     message: string
* }
*/
export const activationOtpChangeEmail = async (req: Request, res: Response) => {
	try {
		await authService.activationOtpChangeEmail(req.body);
		res.status(200).json({ 
			message: "OTP resent to new email!",
		});
	} catch (error) {
		if (error instanceof Error) {
			return res.status(400).json({ message: error.message });
		}
		return res.status(500).json({ message: "Unknown error" });
	}
}

/* ROUTE: POST /auth/activation/complete
* BODY: 
* {
*     message: string, 
*     user: <UserProfile> [REFERENCE: @/types/users]  
*     token: { accessToken: string, refreshToken: string }
* }   
*/  
export const activationComplete = async (req: Request, res: Response) => {
    try {  
        const { user, tokens } = await authService.activationComplete(req.body);
        res.status(200).json({   
            message: "Account activated successfully!", 
            user,  
            tokens  
        }); 
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message });
        }
        return res.status(500).json({ message: "Unknown error" });
    }
}

/* ROUTE: POST /auth/login
* BODY: 
* {
*     message: string, 
*     user: <UserProfile> [REFERENCE: @/types/users]  
*     token: { accessToken: string, refreshToken: string }
* }   
*/  
export const login = async (req: Request, res: Response) => {
	try {  
		const { user, tokens } = await authService.login(req.body);
		res.status(200).json({   
			message: "Login successful!",   
			user,  
			tokens  
		}); 
	} catch (error) {
		if (error instanceof Error) {
			return res.status(400).json({ message: error.message });
		}
		return res.status(500).json({ message: "Unknown error" });
	}
}

/* ROUTE: POST /auth/refresh
* BODY: 
* {
*     message: string, 
*     user: <UserProfile> [REFERENCE: @/types/users]  
*     token: { accessToken: string, refreshToken: string }
* }   
*/  
export const refreshTokens = async (req: Request, res: Response) => {
	try {  
		const { token }  = req.body;  
		const { user, tokens } = await authService.refreshTokens(token);
		res.status(200).json({  
			message: "Token refreshed successfully!", 
			user,  
			tokens 
		});
	} catch (error) {
		if (error instanceof Error) {
			return res.status(400).json({ message: error.message });
		}
		return res.status(500).json({ message: "Unknown error" });
	}
}
