import express from "express";
import morgan from 'morgan';
import logger from "./middlewares/logger.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import tagRoutes from "./routes/tagRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();
app.use(express.json());

const morganStream = {
    write: (message: string) => logger.info(message.trim())
};
app.use(morgan('combined', { stream: morganStream }));

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/blogs", blogRoutes);
app.use("/comments", commentRoutes);
app.use("/tags", tagRoutes);

app.use(errorHandler);

export default app;