import {Request,Response, NextFunction} from 'express';

import { TrustedBrand, TrustedBrandInput } from '../models/TrustedBrand.js';
import { createNewBrand, fetchAllBrandsFromDb, fetchSingleBrandFromDb } from '../services/trusted.brands.service.js';

export const createBrand = async (req: Request, res: Response, next : NextFunction) => {
    try {
        if (!req.file) {
            throw new Error("Please provide a file to upload.")
        }
    
        if (!req.body.name){
            throw new Error("Please provide a name to for upload file.")
        }
    
        let brand: TrustedBrandInput = {
            name: req.body.name,
            file:{
                id: req.file.filename,
                contentType: req.file.mimetype
            }
        }
       let isUploaded: boolean = await createNewBrand(brand);

       if (isUploaded) {
        res.status(201).json({success:true, message: 'File uploaded successfully'});
       }else{
        res.status(500).json({success:false, message: 'File upload failed please try again'});
       }
    }catch (err) {
        next(err);
    }
}

export const getTrustedBrands = async (req: Request, res: Response, next: NextFunction) => {

   try {
        let trustedBrands: Array<TrustedBrand> = await fetchAllBrandsFromDb();
        res.status(200).json(trustedBrands);
   } catch (err) {
    next(err);
   }
}
