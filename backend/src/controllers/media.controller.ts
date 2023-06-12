import mongoose from "mongoose";
import env from "../env.js";
import { NextFunction, Request, Response } from "express";

const connection: mongoose.Connection = mongoose.createConnection(env.GRIDFS_MONGO_DB_URL, {});

let gridfs : mongoose.mongo.GridFSBucket;
connection.once('open', ()=>{ gridfs = new mongoose.mongo.GridFSBucket(connection.db); });

export const stream = async (req: Request, res: Response, next: NextFunction) =>{
   let files = await gridfs.find({filename:req.params.id}).toArray();

    if (files.length > 0){
        gridfs.openDownloadStreamByName(files[0].filename).pipe(res);
    }else{
        return res.status(404).json({
            success: false,
            message: 'no such file exists',
        });
    }
}
