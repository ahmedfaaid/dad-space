import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import * as path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import session from 'express-session';
import connectRedis from 'connect-redis';
import Redis from 'ioredis';

import { UserResolver } from './resolvers/User.resolver';
import { PostResolver } from './resolvers/Post.resolver';
import { CommentResolver } from './resolvers/Comment.resolver';
import { AuthResolver } from './resolvers/Auth.resolver';

dotenv.config();

const main = async () => {
  const app = express();
  const RedisStore = connectRedis(session);
  const redis = new Redis();

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(
    cors({
      credentials: true,
      origin: 'http://localhost:3000'
    })
  );

  app.use(
    session({
      store: new RedisStore({
        client: redis
      }),
      name: 'dad-space-qid',
      secret: process.env.SESSION_SECRET as string,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24 * 7 * 365
      }
    })
  );

  const conn = await createConnection();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, PostResolver, CommentResolver, AuthResolver],
      emitSchemaFile: path.resolve(__dirname, 'schema.gql'),
      validate: false
    }),
    context: ({ req, res }) => ({ req, res, redis }),
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground]
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app, path: '/v1', cors: false });

  const port = process.env.PORT || 5500;

  app.listen(port, function () {
    console.log(`Listening on port ${port}`);
  });
};

main().catch(err => console.log(err));
