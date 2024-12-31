import express from 'express';
import { getRoomsController } from './../controllers/chats.controller.js';
const router = express.Router();

router.get('/rooms', getRoomsController);

export default router;