import express, { Router } from 'express';
import { login } from '../controllers/user.controller.js';

const router: Router = express.Router();

router.post('/login',login);


export { router as userRouter } 