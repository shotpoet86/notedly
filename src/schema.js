/*import gpl from apollo server*/
const { gql } = require('apollo-server-express');
/*GraphQL schemas*/
const typeDefs = gql`
  type Note {
    id: ID!
    content: String!
    author: String!
  }

  type Query {
    notes: [Note!]!
    note(id: ID!): Note!
  }

  type Mutation {
    newNote(content: String!): Note!
  }
`;
/*export GraphQL typeDefs*/
module.exports = typeDefs;