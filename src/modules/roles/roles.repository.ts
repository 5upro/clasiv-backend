import { 
	createClient, 
	type PostgrestSingleResponse 
} from "@supabase/supabase-js";
import type { CreateRole, Role } from "@/types/roles";

const SUPABASE_URL = process.env.SUPABASE_URL as string;
const SUPABASE_KEY = process.env.SUPABASE_KEY as string;

if(!SUPABASE_URL || !SUPABASE_KEY) {
	throw new Error("Missing Supabase credentials");
}

const supabase = createClient(
	SUPABASE_URL,
	SUPABASE_KEY
);

export const getRoles = async (): Promise<PostgrestSingleResponse<Role[]>> => {
    return await supabase
        .from("roles")
        .select("*");
}

export const createRole = async (role: CreateRole): Promise<PostgrestSingleResponse<Role>> => {
    return await supabase
        .from("roles")
        .insert(role)
        .select("*")
        .single();
}
