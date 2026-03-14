import { Request, Response } from "express";
import * as userService from "@/modules/users/users.service";

export const getMe = async (req: Request, res: Response) => {
	try {
		const user = await userService.verifyUserById(req.user!.id);
		res.status(200).json(user);
	} catch (error) {
		if(error instanceof Error)
            res.status(500).send(error.message);
	}
};
