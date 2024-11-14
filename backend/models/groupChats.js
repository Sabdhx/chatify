const mongoose = require("mongoose");
const messageSchema = new mongoose.Schema({
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true
  }],

  chatType: {
    type: String,
    enum: ["ChatGroup", "PersonalChat"],
    default: "ChatGroup",
  },
  name: {
    type: String,
    require: true
  },

  messages:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"Message",
      default:[]
    }
   ],
  
}, { timestamps: true })


const Gc = mongoose.model("GroupChat", messageSchema);
module.exports = Gc