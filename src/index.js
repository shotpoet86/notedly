/*index.js
 * Main entry point of program*/
/*eslint-disable no-undef*/
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
/*port used for program*/
const port = process.env.PORT || 4000;

let notes = [
  {
    id: '1',
    content: 'This is a note',
    author: 'Mike Jones'
  },
  {
    id: '2',
    content: 'Another note',
    author: 'Last Mr. Bigg'
  },
  {
    id: '3',
    content: 'Third note in object',
    author: 'Birdman'
  }
];

/*----------GraphQL----------*/
/*Schemas for GraphQL*/
const typeDefs = gql`
  type Query {
    hello: String
    notes: [Note!]!
  }
  type Note {
    id: ID!
    content: String!
    author: String!
  }
`;

/*Resolvers for GraphQL*/
const resolvers = {
  Query: {
    hello: () => 'Hello World!',
    notes: () => notes
  }
};

/*----------Server----------*/
/*store express in app variable*/
const app = express();
/*Apollo Server setup*/
const server = new ApolloServer({ typeDefs, resolvers });
/*apply the Apollo GraphQL middleware and set the path to /api*/
server.applyMiddleware({ app, path: '/api' });
/*port listener*/
app.listen({ port }, () =>
  console.log(
    `GraphQL server  on http://localhost:${port}${server.graphqlPath}`
  )
);
