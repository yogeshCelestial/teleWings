import express from 'express';
const router = express.Router();
import { signup, login, logout, verify } from "../controllers/auth.controller.js";

router.post('/signup', signup);

router.post('/login', login);

router.post('/logout', logout);

router.get('/verify', verify);

export default router;