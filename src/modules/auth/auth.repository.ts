import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

if(!SUPABASE_URL || !SUPABASE_KEY) {
    throw new Error("Missing Supabase credentials");
}

const supabase = createClient(
    SUPABASE_URL as string,
    SUPABASE_KEY as string
);

export const getUserById = async (inputId: number) => {
	return await supabase
		.from("users")
		.select("id, email_id")
		.eq("id", inputId)
		.single();
}

export const getUserByEmail = async (email: string) => {
    return await supabase
        .from("users")
        .select("*")
        .eq("email_id", email)
        .single();
}

export const getUserByRoll = async (roll_no: string) => {
	return await supabase
		.from("students")
		.select("*")
		.eq("roll_no", roll_no)
		.single();
}

export const setOtpStatus = async (
	id: number, 
	email: string, 
	otpHash: string, 
	expires_at: Date
) => {
    return await supabase
        .from("otp_verify")
        .insert({
			user_id: id,
			email_id: email,
            hashed_otp: otpHash,
            expires_at: expires_at
		});
}

export const updateOtpStatus = async (
    email: string, 
	attempts: number,
	verified: boolean
) => {
    return await supabase
        .from("otp_verify")
        .update({ 
            attempts: attempts,
            verified: verified
		})
        .eq("email_id", email);
}

export const getOtpStatus = async (email: string) => {
    return await supabase
        .from("otp_verify")
        .select("*")
        .eq("email_id", email)
        .single();
}

export const deleteOtpStatus = async (email: string) => {
    return await supabase
        .from("otp_verify")
        .delete()
        .eq("email_id", email);
}

export const activeUser = async (id: number, email: string) => {
    return await supabase
        .from("users")
        .update({
            email_id: email,
			registered: true
        })
		.eq("id", id)
		.select("*")
        .single();
}
