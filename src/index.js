/*index.js
 * Main entry point of program*/
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
require('dotenv').config();
const jwt = require('jsonwebtoken');

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

const getUser = token => {
  if (token) {
    try {
      /*return users information from token*/
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      /*if problem with validation, throw error*/
      throw new Error('Session invalid');
    }
  }
};

/*Apollo Server setup*/
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    /*get user token from header*/
    const token = req.headers.authorization;
    /*try to retrieve an existing user with token*/
    const user = getUser(token);
    /*log user to console*/
    console.log(user);
    /*adds db models to the context*/
    return { models, user };
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
