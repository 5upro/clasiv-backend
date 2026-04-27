import { pgEnum } from "drizzle-orm/pg-core";

export const activationStatus = pgEnum(
	"activation_status", [
		'initiated', 
		'otp_sent', 
		'otp_verified', 
		'completed', 
		'expired'
	]
);
