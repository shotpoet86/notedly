/*export mutation resolvers*/
module.exports = {
  newNote: async (parent, args, { models }) => {
    return await models.Note.create({
      content: args.content,
      author: 'Mike Jones rapper'
    });
  },
  deleteNote: async (parent, { id }, { models }) => {
    try {
      models.Note.findOneAndRemove({ _id: id });
      return true;
    } catch (err) {
      return false;
    }
  },
  updateNote: async (parent, { content, id }, { models }) => {
    return models.Note.findOneAndUpdate({
        _id: id
      },
      {
        $set: {
          content
        }
      },
      {
        new: true
      }
    );
  }
};

