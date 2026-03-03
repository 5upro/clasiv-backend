import * as userRepository from "./users.repository";

export const verifyUserById = async (id: string) => {
	const { data, error } = await userRepository.getUserById(id);
	if(error){
        throw new Error(error.message);
	}
	if(!data){
        throw new Error("User not found");
	}
    return data;
};
