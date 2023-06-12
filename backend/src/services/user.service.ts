import UserModel, { User, UserInput } from '../models/User.js';

export const createUser = async (user: UserInput): Promise<User> => {
    console.log('createUser', user);
    return await UserModel.create(user);
}

export const findUser = async (id:string ): Promise<User> => {
    return await UserModel.findById(id);
}


