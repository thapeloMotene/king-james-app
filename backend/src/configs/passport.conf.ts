import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import UserModel, { User } from "../models/User.js";


passport.serializeUser(function(user: any, done){
	done(null,user._id);
});

passport.deserializeUser(async function(id, done){

	let user : User =await  UserModel.findById(id);

	if (user){
		done(null,user);
	}else{
		done("User not found",null);
	}
});

passport.use('local-login', new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password',
	
	passReqToCallback: true

}, async function(req, email, password, done){
	console.log('[email]',email);
	console.log('[password]', password);

	let user: User = await UserModel.findOne({email: email});

	if(!user){
		return done(null,false, 'No user has been found in the database');
	}

	//@ts-ignore
	if (!user.comparePassword(password)){
		return done(null, false,'Sorry, you supplied an incorrect password');
	}
	
	return done(null, user);

}));
