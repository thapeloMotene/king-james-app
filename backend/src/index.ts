import express,{ Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import session from 'express-session';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { readFileSync } from 'fs';
import path from 'path';
import ErrorHandler from './error-handler/err-handler.js';
import './configs/passport.conf.js' 
import env from './env.js';
import { routes } from './router/index.js';
import { resolvers } from './graphql/resolvers/index.js';
import passport from 'passport';
import { User } from './models/User.js';

const schemaPath: string = path.resolve('./src/graphql/schema.graphql');
const typeDefs = readFileSync(schemaPath, {encoding: 'utf-8'});


mongoose.connect(env.MONGO_DB_URL)
.then(() => {
    console.log('🛰 Connection to database is established successfully');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

const app: Express = express();
app.use(session({
  secret: env.SECRET_KEY,
  resave: false,
  saveUninitialized: false,
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(routes);
app.use(ErrorHandler);

interface AppContext {
  req: Request
  res: Response
}

const server = new ApolloServer<AppContext>({
  typeDefs,
  resolvers,
  
});

await server.start();

app.use('/graphql', cors<cors.CorsRequest>(),express.json(), expressMiddleware(server,{
  context: async ({ req, res }) => ({
   req,
   res
  })
})
);

app.listen(env.PORT, () => {
    console.log(`🚀 listening on port: ${env.PORT}`);
});