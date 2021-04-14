/*import query and mutation resolvers from respective files*/
const Query = require('./query.js');
const Mutation = require('./mutation');
/*export resolvers*/
module.exports = { Query, Mutation };