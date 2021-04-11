// index.js
// This is the main entry point of application
/*eslint-disable no-undef*/
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

const port = process.env.PORT || 4000;
/*construct a schema using graphQL*/
const typeDefs = gql`
  type Query {
    hello: String
  }
`;
/*resolver function for above schema setup*/
const resolvers = {
  Query: {
    hello: () => 'Hello World!'
  }
};

const app = express();
/*Apollo Server setup*/
const server = new ApolloServer({ typeDefs, resolvers });
/*apply the Apollo GraphQL middleware and set the path to /api*/
server.applyMiddleware({ app, path: '/api' });

app.listen({ port }, () =>
  console.log(
    `GraphQL server  on http://localhost:${port}${server.graphqlPath}`
  )
);
