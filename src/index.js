/*index.js
 * Main entry point of program*/
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
require('dotenv').config();

/*local module imports*/
const db = require('./db');
const models = require('./models');
const typeDefs = require('./schema.js');
const resolvers = require('./resolvers');

/*runs server on port specified in .env file or port 4000*/
const port = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST;


/*store express in app variable*/
const app = express();

/*connect to specified database*/
db.connect(DB_HOST);

/*Apollo Server setup*/
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => {
    /*adds db models to the context*/
    return { models };
  }
});

/*apply the Apollo GraphQL middleware and set the path to /api*/
server.applyMiddleware({ app, path: '/api' });

/*port listener*/
app.listen({ port }, () =>
  console.log(
    `GraphQL server  on http://localhost:${port}${server.graphqlPath}`
  )
);
