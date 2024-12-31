import express from 'express';
const router = express.Router();
import { sendMessageController } from './../controllers/message.controller.js';

router.post('/send/:id', sendMessageController);

export default router;