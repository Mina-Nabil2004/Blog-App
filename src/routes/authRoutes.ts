import { Router } from "express";
import { UserLoginSchema, UserSignupSchema } from "../schemas/userSchema.js";
import validator from "../middlewares/validator.js";
import { signupController, loginController, refreshTokenController, logoutController } from "../controllers/authController.js";

const router = Router();

router.post("/signup", validator(UserSignupSchema), signupController);
router.post("/login", validator(UserLoginSchema), loginController);
router.post("/logout", logoutController);
router.post("/refresh", refreshTokenController);

export default router;