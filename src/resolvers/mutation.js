/*export mutation resolvers*/
module.exports = {
  newNote: async (parent, args, { models }) => {
    return await models.Note.create({
      content: args.content,
      author: 'Mike Jones rapper'
    });
  }
};