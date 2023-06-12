import { Request, Response, NextFunction} from 'express';
import ValidationException from './exceptions/ValidationException.js';
import env from '../env.js';

const ErrorHandler = (err : unknown, req: Request, res: Response, next: NextFunction) =>{

        let status: number = 500;
        let message: string = 'something bad happened';
        let stack: string | undefined = "";

        if (err instanceof Error){
            message = err.message;
            stack = env.isDevelopment ? err.stack : '';
        }

        if (err instanceof ValidationException){
            status = err.status;
        }

        res.status(status).json({
            success: false,
            status: status,
            message: message,
            stack: stack
        })
        
        next(err);
}

export default ErrorHandler;