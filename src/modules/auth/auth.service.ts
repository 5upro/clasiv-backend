import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import * as authRepository from "@/modules/auth/auth.repository";
import { generateOtp, hashOtp, isOtpExpired, setOtpExpiry, verifyOTP } from "@/utils/otp";
import { sendEmail } from "@/utils/email";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

if(!JWT_SECRET){
    throw new Error("JWT_SECRET is not defined");
}

export const register = async (roll_no: string, email: string) => {
	const { data, error } = await authRepository.getUserByRoll(roll_no);
	if(error){
        throw new Error("Error getting user");
    }
	if(!data){
		throw new Error("User not found");
	}
    if(data.email_id === email){
        throw new Error("User is already registered");
    }
	if(data.email_id !== email && data.email_id){
        throw new Error("Invalid Credentials");
    }

	const otp = generateOtp();
	const otpHash = hashOtp(otp);

    await authRepository.setOtpStatus(
		data.id, 
		email, 
		otpHash, 
		setOtpExpiry()
	);

	await sendEmail(data.name, email, otp);
	return;
}

export const registerVerification = async (email: string, otp: string) => {
    const { data, error } = await authRepository.getOtpStatus(email);
    if(error){
        throw new Error(error.message);
    }
    if(!data){
        throw new Error("User not found");
    }
	if(data.attempts > 5){
        throw new Error("OTP limit exceeded");
	}
	if(isOtpExpired(data.expires_at)){
        throw new Error("OTP expired");
	}

	const isValid = verifyOTP(otp, data.hashed_otp);
    if(!isValid){
        await authRepository.updateOtpStatus(email, ++data.attempts, false);
        throw new Error("Invalid OTP");
    }

    await authRepository.updateOtpStatus(email, ++data.attempts, true);
	const { data: user, error: userError } = await authRepository.activeUser(data.user_id, email);
    if(userError){
        throw new Error(userError.message);
    }
    if(!user){
        throw new Error("User not found");
    }
	await authRepository.deleteOtpStatus(email);
	const token = jwt.sign(
		{
            id: user.id,
            email: user.email_id
		},
		JWT_SECRET ,
		{expiresIn: "10m"}
	);

    return { user, token };
}

export const login = async (id: number, email: string) => {
	console.log("Login called");
	console.log(id, email);
	const { data, error } = await authRepository.getUserById(id);
	if(error){
		throw new Error(error.message);
	}
	if(!data){
		throw new Error("User not found");
	}
	if(!data.email_id || data.email_id !== email){
		throw new Error("User is not Resgistered");
	}

	const user = {
		id: data.id,
		email: data.email_id,
	};

	const token = jwt.sign(
		{
            id: data.id,
            email: data.email_id
		},
		JWT_SECRET ,
		{expiresIn: "10m"}
	);

	return token;
};
