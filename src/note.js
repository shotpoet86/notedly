const mongoose = require('mongoose');
/*new mongoose schema*/
const noteSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    }
  }, {
    timestamps: true
  }
  )
;

/*defines Note model with schema*/
const Note = mongoose.model('Note', noteSchema);


/*export Note*/
module.exports = Note;