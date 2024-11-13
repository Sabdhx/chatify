const mongoose = require("mongoose");
const messageSchema = new mongoose.Schema({
  participants:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    require:true
}],

  chatType: {
    type: String,
    enum: ["ChatGroup", "PersonalChat"], 
    default: "ChatGroup",
  },
  name:{
     type:String,
     require:true
  },
   
    messages:[
      {  
        sender:{
          type:mongoose.Schema.Types.ObjectId,
          ref:"User"
        },
        recievers:[
          {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
          }
        ],
        content:{
          type:String,
          require:true
        },
        sendAt:{
          type:Date,
          default:Date.now
        }
    },
    ]
},{timestamps:true})


const Gc = mongoose.model("GroupChat" , messageSchema);
module.exports = Gc