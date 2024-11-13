const mongoose =  require("mongoose")

const conversationSchema = new mongoose.Schema({
  type:{
     type:String,
     enum:["GroupChat" , "personalChat"],
     default:"personalChat"
  },
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
   ],
   read: { type: Boolean, default: 0 }
  },
  {timestamps:true}
);
  const conversation = mongoose.model('convo', conversationSchema);

module.exports = conversation;