import express from 'express';
import configDotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
import bodyParser from "body-parser";
import authMiddleware from "./utils/authMiddleware.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import chatRouter from './routes/chats.routes.js';
import userRouter from './routes/user.routes.js';

const app = express();
configDotenv.config();

// parse cookies
app.use(cookieParser());
app.use((cors({
    origin: 'http://localhost:5173',
    credentials: true,
})));

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

const port = process.env.PORT || 9000;

app.use('/api/auth', authRoutes);
app.use('/api/message', authMiddleware, messageRoutes);
app.use('/api/chat', authMiddleware, chatRouter);
app.use('/api/user', authMiddleware, userRouter);


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

