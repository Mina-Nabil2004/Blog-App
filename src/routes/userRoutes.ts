import { Router } from "express";
import { UserCreateSchema, UserUpdateSchema } from "../schemas/userSchema.js";
import validator from "../middlewares/validator.js";
import authenticate from "../middlewares/authenticate.js";
import { 
  createUserController, 
  deleteUserController, 
  getUserController, 
  getUsersController, 
  updateUserController 
} from "../controllers/userController.js";

const router = Router();

router.get("/", authenticate, getUsersController);

router.get("/:id", authenticate, getUserController);

router.post("/", validator(UserCreateSchema), createUserController);

router.patch("/:id", authenticate, validator(UserUpdateSchema), updateUserController);

router.delete("/:id", authenticate, deleteUserController);

export default router;