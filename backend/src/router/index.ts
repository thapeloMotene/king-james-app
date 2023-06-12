import express, { Router } from 'express';
import { trustedBrandsRouter } from './trusted.brands.router.js';
import { mediaRouter } from './media.stream.router.js';
import { userRouter } from './user.router.js';


export const routes: Router = express.Router();

routes.use('/trusted-brand', trustedBrandsRouter);
routes.use('/media', mediaRouter);
routes.use('/user',userRouter);