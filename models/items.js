const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const artSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  tags: {
    type: Array,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  // Change in the future with database
  imageFile: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Art', artSchema);
