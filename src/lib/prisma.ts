import { PrismaClient } from "../generated/prisma/client.js";
import winston from "winston";

const dbLogger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(
            ({ timestamp, level, message }) =>
                `[${timestamp}] ${level.toUpperCase()}: ${message}`
        )
    ),
    transports: [
        new winston.transports.File({ filename: "logs/db.log" }),
    ],
});

const prisma = new PrismaClient({
    log: [
        { emit: "event", level: "query" },
        { emit: "event", level: "info"  },
        { emit: "event", level: "warn"  },
        { emit: "event", level: "error" },
    ],
});

prisma.$on("query", (e) => {
    dbLogger.info(`[Prisma] Query: ${e.query} | Params: ${e.params} | Duration: ${e.duration}ms`);
});

prisma.$on("info", (e) => {
    dbLogger.info(`[Prisma] ${e.message}`);
});

prisma.$on("warn", (e) => {
    dbLogger.warn(`[Prisma] ${e.message}`);
});

prisma.$on("error", (e) => {
    dbLogger.error(`[Prisma] ${e.message}`);
});

export default prisma;