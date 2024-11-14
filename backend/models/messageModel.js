const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  type:{
    type:String,
    enum:["group", "personal"],
    default:"personal",
    require:false
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  senderPic:{
    type:String,
    require:true
  },
  receiver:[ {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  }],
  // recieverPic:{
  //   type:String,
  //   require:true
  // },
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
 
});

// Create a Message model
const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
