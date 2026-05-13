import argon2 from 'argon2';

export const hashPassword = async (password: string): Promise<string> => {
	return await argon2.hash(password,{
        memoryCost: 8192, 
        timeCost: 2, 
        parallelism: 1, 
    });
};

export const verifyPassword = async (password: string, hash: string): Promise<boolean> => {
	return await argon2.verify(hash, password);
};
