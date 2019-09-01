import express from 'express';
import graphqlHTTP from 'express-graphql';
import schema from './graphql/schema';
import helmet from 'helmet';
import cors from 'cors';

// Dotenv config
require('dotenv').config();

const app = express();

// Security and Cors
app.use(helmet());
app.use(cors());

// Routes

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);
