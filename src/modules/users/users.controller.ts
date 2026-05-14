import type { 
	Response, 
	Request, 
	NextFunction
} from 'express';
import * as userService from "@/modules/users/users.service";

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await userService.createUser(req.body);
        res.status(200).json({
			message: user,
			statusCode: 200
		});
    } catch (error) {
		next(error);
    }
}

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
	try {
        const query = req.pagination!;
        const users = await userService.getUsers(query);
        res.status(200).json(users);
	} catch (error) {
		next(error);
	}
}

export const getSelf = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const user = await userService.getSelf(req.user!.id);
		res.status(200).json({
            message: "User found successfully!",
			statusCode: 200,
			user
		});
	} catch (error) {
        next(error);
	}
}

export const updateSelf = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const user = await userService.updateSelf(req.user!.id, req.body);
		res.status(200).json(user);
	} catch (error) {
		next(error);
	}
}

export const getUser = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
	try {
		const user = await userService.getUser(req.params.id);
		res.status(200).json({
            message: "User found successfully!",
			statusCode: 200,
			user
		});
	} catch (error) {
		next(error);
	}
}

export const updateUser = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    try {
        const user = await userService.updateUser(req.params.id, req.body);
        res.status(200).json({
			message: user,
			statusCode: 200
        });
    } catch (error) {
		next(error);
    }
}

export const deleteUser = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    try {
        const user = await userService.deleteUser(req.params.id);
        res.status(200).json({
			message: user,
			statusCode: 200
		});
    } catch (error) {
		next(error);
    }
}
