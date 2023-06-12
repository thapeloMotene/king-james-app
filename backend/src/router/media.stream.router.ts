import express, { Router } from 'express';
import { stream } from '../controllers/media.controller.js';

const router: Router = express.Router();

router.get('/stream/:id',stream);

export { router as mediaRouter } 