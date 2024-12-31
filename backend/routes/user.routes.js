import express from 'express';
const router = express.Router();
import { getUser } from './../controllers/user.controller.js';

router.get('/info/:id', getUser);

export default router;