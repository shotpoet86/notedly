/*import Mongoose*/
const mongoose = require('mongoose');
/*mongoose schemas*/
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      index: { unique: true }
    },
    email: {
      type: String,
      required: true,
      index: { unique: true }
    },
    password: {
      type: String,
      required: true
    },
    avatar: {
      type: String
    }
  },
  {
    /*assigns createdAt and updatedAt fields with a Date type*/
    timestamps: true
  }
);
/*store noteSchema in Note*/
const User = mongoose.model('User', userSchema);
/*export Note*/
module.exports = User;
