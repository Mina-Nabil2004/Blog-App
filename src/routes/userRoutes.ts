import { Router } from "express";
import { UserCreateSchema, UserUpdateSchema } from "../schemas/userSchema.js";
import validator from "../middlewares/validator.js";
import { 
  createUserController, 
  deleteUserController, 
  getUserController, 
  getUsersController, 
  updateUserController 
} from "../controllers/userController.js";

const router = Router();

router.get("/", getUsersController);

router.get("/:id", getUserController);

router.post("/",validator(UserCreateSchema), createUserController);

router.put("/:id", validator(UserUpdateSchema), updateUserController);

router.delete("/:id", deleteUserController);

export default router;