const mongoose = require("mongoose");
const messageSchema = new mongoose.Schema({
  name:{
     type:String,
     requrie:true
  },
    participants:{
         type:mongoose.Schema.Types.ObjectId,
         ref:"User",
         requrie:true
    },
    messages:[
      {  
        type:mongoose.Schema.Types.ObjectId,
        ref:"Message",
    },
    ]
},{timestamps:true})


const Gc = mongoose.model("GroupChat" , messageSchema);
module.exports = Gc