import { NextFunction, Request, Response } from "express";
import '../configs/passport.conf.js';
import passport from "passport";

export const login = async (req: Request, res: Response, next: NextFunction) =>{

    passport.authenticate('local-login', function(err, user, info) {

        if (err) return res.json({"isAuthenticaed":false});
        if (!user) return  res.json({"message":"No user found in the database"});
        req.logIn(user, (error)=>{
            if (error) return next(error);
            res.json(user);
        });
        })(req, res, next);
}
