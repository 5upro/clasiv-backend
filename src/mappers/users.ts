import type { 
    User,
    UserSafe,
	UserProfile,
    UserProfileSafe,
} from "@/types/users";

export const cleanUserBase = (user: User): UserSafe => {
	const { passwordHash, id, ...safeUser } = user;
	return safeUser;
}

export const cleanUserProfile = (user: UserProfile): UserProfileSafe => {
	const { passwordHash, id, ...safeUser } = user;
	return safeUser;
};
