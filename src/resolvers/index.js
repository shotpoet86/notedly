/*import query and mutation resolvers from respective files*/
const Query = require('./query.js');
const Mutation = require('./mutation');
const { GraphQLDateTime } = require('graphql-iso-date');
/*export resolvers*/
module.exports = { Query, Mutation, DateTime: GraphQLDateTime };