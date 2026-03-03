export interface AuthPayload {
    id: string;
    email: string;
};

export interface EmailOtp {
	id: string;
	created_at: Date;
	user_id: string;
	email_id: string;
	hashed_otp: string;
	verified: boolean;
	attempts: number;
	expires_at: Date;
};
