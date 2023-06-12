import { Schema, InferSchemaType, model, Document} from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new Schema({
    firstname: {type: Schema.Types.String},
    lastname: {type: Schema.Types.String},
    password: {type: Schema.Types.String, required: true},
    email: {type: Schema.Types.String, required: true},
    role: {type: Schema.Types.String, enum:['Admin', 'Basic'], default: 'Basic'}
});

UserSchema.pre(['save'],function(next){
    var user = this;
   if (!user.isModified('password')) return next();

   
   bcrypt.genSalt(15, function(err, salt) {
       if (err) return next(err);
       bcrypt.hash(user.password, salt, function(err, hash) {
           if (err) return next(err);
           user.password = hash;
           next();
       });
   });
});

UserSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password,this.password);
}
interface UserMethods {
    comparePassword(password:string): boolean;
  }
export interface UserInput {
    firstname: string
    lastname: string
    email: string
    password: string
    role?: string
}

export type User = InferSchemaType<typeof UserSchema & Document & UserMethods>;

export default model<User>('User',UserSchema);