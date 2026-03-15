import { 
	OtpPayload, 
	OtpSession, 
	UpdateOtpSession, 
	UpdateOtpSessionSchema 
} from "@/types/auth";
import { 
	User 
} from "@/types/users";
import { 
	createClient, 
	PostgrestSingleResponse 
} from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL as string;
const SUPABASE_KEY = process.env.SUPABASE_KEY as string;

if(!SUPABASE_URL || !SUPABASE_KEY) {
    throw new Error("Missing Supabase credentials");
}

const supabase = createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

export const getUserById = async (id: string): Promise<PostgrestSingleResponse<User>> => {
    return await supabase.rpc("get_user_by_id", {
		_user_id: id
	}).single();
}

export const getUserByEmail = async (email: string) => {
    return await supabase
        .from("users")
        .select("*, student:students(*), teacher:teachers(*)")
        .eq("email_id", email)
        .single();
}

export const getUserByRoll = async (roll_no: string) => {
	return await supabase
		.from("users")
		.select("*, student:students!inner(roll_no)")
		.eq("students.roll_no", roll_no)
		.single();
}

export const setOtpStatus = async (otp: OtpPayload): Promise<PostgrestSingleResponse<OtpSession>> => {
    return await supabase
        .from("otp_sessions")
        .insert({
			user_id: otp.id,
			email_id: otp.email,
            otp_hash: otp.value,
			purpose: otp.type
		})
		.select()
		.single();
}

export const updateOtpStatus = async (session_Id: string, updates: UpdateOtpSession): Promise<PostgrestSingleResponse<OtpSession>> => {
    const parsedUpdates = UpdateOtpSessionSchema.parse(updates);
    return await supabase
        .from("otp_sessions")
        .update({
			...parsedUpdates,
            updated_at: new Date(),
		})
        .eq("id", session_Id)
		.select()
		.single();
}

export const getOtpStatus = async (session_Id: string): Promise<PostgrestSingleResponse<OtpSession>> => {
    return await supabase
        .from("otp_sessions")
        .select("*")
        .eq("id", session_Id)
        .single();
}

export const deleteOtpStatus = async (session_Id: string) => {
    return await supabase
        .from("otp_sessions")
        .delete()
        .eq("id", session_Id);
}

export const registerUser = async (user_id: string, email: string): Promise<PostgrestSingleResponse<User>> => {
    return await supabase.rpc("register_user", {
		_user_id: user_id,
        _email_id: email
	}).single();
}

export const loginUser = async (user_id: string): Promise<PostgrestSingleResponse<User>> => {
    return await supabase.rpc("login_user", {
		_user_id: user_id,
    }).single();
}
