import { Router } from "express";
import * as userController from "@/modules/users/users.controller";
import userAuth from "@/middleware/user.authentication";
import validator from "@/middleware/user.validator";
import paginationValidator  from "@/middleware/pagination.middleware";
import { CreateUserSchema, UpdateUserSchema } from "@/types/users";

const router = Router();

router.use(userAuth);

router.post("/",
	validator(CreateUserSchema),
	userController.createUser
);
router.get("/", 
	paginationValidator,
	userController.getUsers
);
router.patch("/",
	validator(UpdateUserSchema),
	userController.updateUser
);
router.get("/me", userController.getMe);

export default router;
