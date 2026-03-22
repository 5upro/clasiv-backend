import { Request, Response } from "express";
import * as roleService from "@/modules/roles/roles.service";

export const getRoles = async (_req: Request, res: Response) => {
    try{
        const roles = await roleService.getRoles();
        res.json(roles);
    } catch(error) {
        if(error instanceof Error)
            res.status(500).send(error.message);
    }
}

export const createRole = async (req: Request, res: Response) => {
    try{
        const role = await roleService.createRole(req.body);
        res.json({
			message: "Role created successfully!",
			role
		});
    } catch(error) {
        if(error instanceof Error)
            res.status(500).send(error.message);
    }
}
