const conversation = require("../models/chatSchema.js");
const Message = require("../models/messageModel.js");


const messageSend = async (req, res) => {
    const { content , imageUrl } = req.body;
    const { id: receiver } = req.params;
    const sender = req.sender;
   //   console.log(content);
   //   console.log(req.params.id)
     console.log(content);
     console.log(imageUrl)
    try {
       let cov = await conversation.findOne({
          members: { $all: [sender, receiver] }
       });
 
       if (!cov) {
        cov = await conversation.create({ members: [sender, receiver] });
       }
 
       const newMessage = await Message.create({
          sender,
          receiver,
          content,
          imageUrl
       });
 
       if (newMessage) {
          cov.messages.push(newMessage._id);
       }
 
       await Promise.all([cov.save(), newMessage.save()]);
 
       res.status(200).json(newMessage);
    } catch (error) {
       res.status(500).json({ error: error.message });
    }
 };
 
const allMessages = async(req,res)=>{
   const response = await Message.find();
   res.status(200).json(response)
}

const deleteMessage=async(req,res)=>{
  const {id}  = req.params;
  console.log(id);
  try{
   const response = await Message.findByIdAndDelete(id);
   res.status(500).json({message:"the message is deleted"})
  }catch(error){
   res.status(200).json(error.message)
  }

}



const editMessage = async (req, res) => {
   const { id } = req.params;          // Message ID to identify the message
   const { content } = req.body;        // New content for the message
 
   console.log("New content:", content);
   console.log("Message ID:", id);
 
   try {
     // Update the message with new content
     const updatedMessage = await Message.findByIdAndUpdate(
       id,
       { content },   // Only update the content field
       { new: true }  // Return the updated document
     );
 
     if (!updatedMessage) {
       // If the message isn't found, respond with a 404 error
       return res.status(404).json({ message: "Message not found" });
     }
 
     // Successfully updated, send the updated message back
     res.status(200).json(updatedMessage);
 
   } catch (error) {
     console.error("Error updating message:", error.message);
     // Send error response
     res.status(500).json({ message: "Error updating message", error: error.message });
   }
 };




const filteringChats = async(req, res) => {
    const { senderId, receiverId } = req.query;
 
    try {
       let changes = await conversation.findOne({
        members:{$all:[senderId , receiverId]} 
       }).populate("messages")
        
   
        res.status(200).json(changes);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
 };
module.exports = {editMessage,deleteMessage,messageSend,allMessages,filteringChats}