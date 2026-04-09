import { Router } from "express";
import validator from "../middlewares/validator.js";
import { PostSchema } from "../schemas/postSchema";

const router = Router();

router.get("/", (req, res) => {
  res.send("Post list");
});
router.post("/", (req, res) => {
  res.send("Post created");
});
router.put("/:id", (req, res) => {
  res.send("Post updated");
});
router.delete("/:id", (req, res) => {
  res.send("Post deleted");
});

router.use(validator(PostSchema));

export default router;