import { Router } from "express";
import { UserSchema } from "../schemas/userSchema";
import validator from "../middlewares/validator.js";

const router = Router();

router.get("/", (req, res) => {
  res.send("User list");
});
router.post("/", (req, res) => {
  res.send("User created");
});
router.put("/:id", (req, res) => {
  res.send("User updated");
});
router.delete("/:id", (req, res) => {
  res.send("User deleted");
});

router.use(validator(UserSchema));

export default router;