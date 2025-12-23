import express, { json } from 'express';
import { createServer } from 'http';
import cors from 'cors';
import dotenv from "dotenv";
import userRouter from '../routes/userRoute.js';
import journalRoute from '../routes/journalRoute.js';
import chatRoute from "../routes/chatRoute.js";
import connectDB from '../config/db.js';
import swagger from "../config/swagger.js";

connectDB();
dotenv.config();
const { swaggerUi, swaggerSpec } = swagger;

const app = express();
app.use(json());
app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/users', userRouter);
app.use('/api/journal', journalRoute)
app.use('/api/chat', chatRoute)

const PORT = process.env.PORT || 5000;

const server = createServer(app);

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});