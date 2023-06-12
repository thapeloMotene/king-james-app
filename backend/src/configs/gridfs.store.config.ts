
import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
import env from "../env.js";

var storage = new GridFsStorage({
    url: env.GRIDFS_MONGO_DB_URL
});

const upload = multer({ storage });

export default upload;