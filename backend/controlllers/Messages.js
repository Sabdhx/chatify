const conversation = require("../models/chatSchema.js");
const Message = require("../models/messageModel.js");

const messageSend = async (req, res) => {
   const { content, imageUrl } = req.body;
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

const allMessages = async (req, res) => {
   const response = await Message.find();
   res.status(200).json(response)
}

const deleteMessage = async (req, res) => {
   const { id } = req.params;
   console.log(id);
   try {
      const response = await Message.findByIdAndDelete(id);
      res.status(500).json({ message: "the message is deleted" })
   } catch (error) {
      res.status(200).json(error.message)
   }

}



const editMessage = async (req, res) => {
   const { id } = req.params;       
   const { content } = req.body;        

   console.log("New content:", content);
   console.log("Message ID:", id);

   try {
      const updatedMessage = await Message.findByIdAndUpdate(
         id,
         { content },   
         { new: true } 
      );

      if (!updatedMessage) {
         return res.status(404).json({ message: "Message not found" });
      }

      res.status(200).json(updatedMessage);

   } catch (error) {
      console.error("Error updating message:", error.message);
      res.status(500).json({ message: "Error updating message", error: error.message });
   }
};

const filteringChats = async (req, res) => {
   const { senderId, receiverId } = req.query;
   const currentUserId = req.sender; 

   try {
      const conversationData = await conversation.findOne({
         members: { $all: [senderId, receiverId] }
      }).populate("messages");
      
    console.log(conversationData)
   console.log("this is conversation id " + conversationData._id) 


      res.status(200).json(conversationData);

   } catch (error) {
      res.status(500).json({ success: false, error: error.message });
   }
};
const notifyMe = async (req, res) => {
   const { userId, senderId, messageId, content, isRead } = req.body;
   console.log("userId :" + userId)
   console.log("senderId :" + senderId)
   console.log("messageId :" + messageId)
   console.log("content :" + content)
   console.log("isRead :" + isRead)

   try {
      res.status(500).json({ message: "notification send" })
   } catch (error) {
      res.status(200).json({ message: error.message })
   }
}




module.exports = {notifyMe, editMessage, deleteMessage, messageSend, allMessages, filteringChats }