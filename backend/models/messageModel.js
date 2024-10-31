const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  content: {
    type: String,
    required: false,
  },
  imageUrl:
    {type: String,
    required: false}
  ,
  timestamp: {
    type: Date,
    default: Date.now,
  },
  read: {
    type: Boolean,
    default: false,
  },
});

// Create a Message model
const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
