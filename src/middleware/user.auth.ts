import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { AuthPayload } from "../types/auth";

dotenv.config();

export const userAuth = (req: Request, res: Response, next: NextFunction) => {
	const authHeader = req.headers.authorization;

	if(!authHeader) {
		return res.status(401).json({message: "No Token"});
	}

	const token = authHeader?.split(" ")[1];

	try {
		const decode = jwt.verify(token, process.env.JWT_SECRET as string) as AuthPayload;
		req.user = decode;
        next();
	} catch (error) {
        return res.status(401).json({message: "Invalid Token"});
	}
}
