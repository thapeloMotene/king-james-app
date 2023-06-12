import { fetchAllBrandsFromDb, fetchSingleBrandFromDb } from "../../services/trusted.brands.service.js";
import { createUser } from "../../services/user.service.js";
import '../../configs/passport.conf.js';

export const resolvers = {
    Query: {
      brands: () => fetchAllBrandsFromDb(),
      brand: (_, args,{ req }) => { fetchSingleBrandFromDb(args.id)},
      me: (_, args, { req }) => {
        return req.user ?? null
      }
    },
    Mutation:{
      registerUser: (_, args) => createUser(args.userInput),
     
    }
  };
