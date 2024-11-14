const Gc = require("../models/groupChats.js")
const Message = require("../models/messageModel.js");


const makeAgroup = async (req, res) => {

   const { idss, input } = req.body;

   let participants = [];

   idss.forEach((item, index) => {
      participants[index] = item;
   });
   console.log(participants)
   const response = await Gc.create({ participants, name: input });
   console.log(response)
   res.status(200).json(response)

};

const getAllGc = async (req, res) => {
   const response = await Gc.find();
   res.status(200).json(response)
}


const sendMessageToGc = async (req, res) => {
    const {content , imageUrl ,type  }  = req.body;
    console.log(req.sender)
    const {id} = req.params;
    const chatSchema = await Gc.findById(
      id 
      
    );
    if(!chatSchema){
      res.status(200).json({message:"there is not chat group"})
    }
    
    const receiver = chatSchema.participants.filter(
      (participant) => !participant.equals(req.sender)
    );
    
    const message = await Message.create(
      {
      sender:req.sender,
      receiver,
      content,
      imageUrl,
      type
    });
    chatSchema.messages.push(message._id);

    await Promise.all([chatSchema.save() , message.save()]);

      console.log(message)
    res.status(200).json(chatSchema)
}


const FilterGroupChats = async (req, res) => {
  const { id } = req.query;
  
  const filtering = await Gc.findById(id).populate("messages");
  console.log(filtering)
  res.status(200).json(filtering)
}







module.exports = { sendMessageToGc, FilterGroupChats, getAllGc, makeAgroup } 