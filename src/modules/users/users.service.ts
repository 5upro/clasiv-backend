import * as userRepository from "@/modules/users/users.repository";

export const verifyUserById = async (id: string) => {
	const { data: user, error: userErr } = await userRepository.getUserById(id);
	if(userErr){
        throw new Error(userErr.message);
	}
	if(!user){
        throw new Error("User not found");
	}
    return user;
};
