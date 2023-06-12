import express, { Router } from 'express';
import { createBrand, getTrustedBrands } from '../controllers/trusted.brands.controller.js';
import upload from '../configs/gridfs.store.config.js';


const router: Router = express.Router();

router.post('/', upload.single("image"), createBrand);
router.get('/', getTrustedBrands);

export { router as trustedBrandsRouter } 