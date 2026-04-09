import express from "express";
import morgan from 'morgan';
import logger from "./middlewares/logger.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();
app.use(express.json());
const stream = {
  write: (message:string) => logger.info(message.trim())
};

app.use(morgan('combined', { stream }));

app.use("/users", userRoutes);
app.use("/posts", postRoutes);

app.use(errorHandler);

export default app;