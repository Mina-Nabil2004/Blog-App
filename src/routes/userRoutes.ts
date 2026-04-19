import { Router } from "express";
import { UserCreateSchema, UserUpdateSchema, UserChangePasswordSchema, UserChangeRoleSchema } from "../schemas/userSchema.js";
import validator from "../middlewares/validator.js";
import authenticate from "../middlewares/authenticate.js";
import authorize from "../middlewares/authorize.js";
import {
    createUserController, deleteUserController, getUserController,
    getUsersController, updateUserController, changePasswordController,
    changeRoleController, getUserBlogsController, getUserCommentsController
} from "../controllers/userController.js";

const router = Router();

router.get("/", authenticate, getUsersController);

router.get("/:id", authenticate, getUserController);

router.get("/:id/blogs", authenticate, getUserBlogsController);

router.get("/:id/comments", authenticate, getUserCommentsController);

router.post("/", validator(UserCreateSchema), createUserController);

router.patch("/:id", authenticate, validator(UserUpdateSchema), updateUserController);

router.patch("/:id/password", authenticate, validator(UserChangePasswordSchema), changePasswordController);

router.patch("/:id/role", authenticate, authorize("ADMIN"), validator(UserChangeRoleSchema), changeRoleController);

router.delete("/:id", authenticate, authorize("ADMIN"), deleteUserController);

export default router;