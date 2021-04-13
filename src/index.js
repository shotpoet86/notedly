/*index.js
 * Main entry point of program*/
/*eslint-disable no-undef*/


const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
require('dotenv').config();
const db = require('./db');
const models = require('./models');
/*port used for program*/
const port = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST;

/*----------GraphQL----------*/
/*Schemas for GraphQL*/
const typeDefs = gql`
  type Note {
    id: ID!
    content: String!
    author: String!
  }

  type Query {
    hello: String
    notes: [Note!]!
    note(id: ID!): Note!
  }

  type Mutation {
    newNote(content: String!): Note!
  }
`;

/*Resolvers for GraphQL*/
const resolvers = {
  Query: {
    hello: () => 'Hello World!',
    notes: async () => {
      return models.Note.find();
    },
    note: async (parent, args) => {
      return models.Note.findById(args.id);
    }
  },
  Mutation: {
    newNote: async (parent, args) => {
      return await models.Note.create({
        content: args.content,
        author: 'Who Mike Jones'
      });
    }
  }
};

/*----------Server----------*/
/*store express in app variable*/
const app = express();

db.connect(DB_HOST);
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
