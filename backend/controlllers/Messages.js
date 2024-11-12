const conversation = require("../models/chatSchema.js");
const Message = require("../models/messageModel.js");
const Gc = require("../models/groupChats.js")

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




// const filteringChats = async (req, res) => {
//    const { senderId, receiverId } = req.query;
//    const currentUserId = req.sender; // Assume this is passed to determine who is opening the chat

//    try {
//      // Find conversation with messages populated
//      const conversationData = await conversation.findOne({
//        members: { $all: [senderId, receiverId] }
//      }).populate("messages");

//      if (!conversationData) {
//        return res.status(404).json({ success: false, message: "Conversation not found" });
//      }

//      // Check if conversationData._id exists
//    //   console.log("Conversation ID:", conversationData._id);

//      // Update read status only if the receiver is opening the chat
//      if (currentUserId !== senderId) { 
//       console.log("first")
//        await Message.updateMany(
//          { sender: senderId, receiver: receiverId, read: false },
//          { $set: { read: true } }
//        );
//      }

//      // Filter unread messages and calculate unread count
//      const unreadMessages = conversationData.messages.filter(
//        (message) => message.read === false
//      );
//      const unreadNotifications = unreadMessages.length;

//      // Update unreadCount in conversation if _id exists
//      if (conversationData._id) {
//        await conversation.updateOne(
//          { _id: conversationData._id },
//          { $set: { unreadCount: unreadNotifications } }
//        );
//      } else {
//        console.log("No conversation ID found, unable to update unreadCount.");
//      }

//      console.log(conversationData)

//      res.status(200).json( conversationData );
//    } catch (error) {
//      res.status(500).json({ success: false, error: error.message });
//    }
//  };


const filteringChats = async (req, res) => {
   const { senderId, receiverId } = req.query;
   const currentUserId = req.sender; // Current user opening the chat

   try {
      const conversationData = await conversation.findOne({
         members: { $all: [senderId, receiverId] }
      }).populate("messages");




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



const makeAgroup = async (req, res) => {
   const { idss ,input } = req.body;

   let values = {};

   idss.forEach((item, index) => {
     values[index] = item; 
   });

   console.log(values);
  const response = await Gc.create({values , name:input});
  res.status(200).json(response)

};

const getAllGc = async (req, res) => {
   const response = await Gc.find();
   res.status(200).json(response)
}
module.exports = { getAllGc, makeAgroup, notifyMe, editMessage, deleteMessage, messageSend, allMessages, filteringChats }