import { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";

const validator = <T>(schema: ZodType<T>) => 
	(req: Request<{}, {}, T>, res: Response, next: NextFunction) => {
		const user = schema.safeParse(req.body);

		if (!user.success) {
			return res.status(400).json({
				error: user.error.issues.map((err) => ({
					path: err.path.join("."),
					message: err.message,
				})),
			});    
		}
		req.body = user.data;
		next();
	}

export default validator;
