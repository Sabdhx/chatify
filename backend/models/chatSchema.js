const mongoose =  require("mongoose")

const conversationSchema = new mongoose.Schema({
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
      },
    ],
   messages:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"Message",
      default:[]
    }
   ]
  },
  {timestamps:true}
);
  const conversation = mongoose.model('convo', conversationSchema);

module.exports = conversation;