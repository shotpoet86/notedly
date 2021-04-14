/*import Mongoose*/
const mongoose = require('mongoose');
/*mongoose schema*/
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
/*store noteSchema in Note*/
const Note = mongoose.model('Note', noteSchema);
/*export Note*/
module.exports = Note;