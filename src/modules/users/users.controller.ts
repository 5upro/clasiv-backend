import { Request, Response } from "express";
import * as userService from "./users.service";

export const getMe = async (req: Request, res: Response) => {
	if(!req.user) {
        return res.status(401).json({message: "No Token"});
	}

	try {
		const user = await userService.verifyUserById(req.user.id);
		res.status(201).json(user);
	} catch (error) {
		res.status(500).send("Error getting user");
	}
};
