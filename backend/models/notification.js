const mongoose= require("mongoose")
const NotificationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // The user who receives the notification
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // The user who sent the message
    messageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Message', required: true }, // The ID of the message related to the notification
    content: { type: String, required: true }, // Brief description of the notification (e.g., "You have a new message from {senderName}")
    isRead: { type: Boolean, default: false }, // Status to track if the notification has been read
    createdAt: { type: Date, default: Date.now }, // Timestamp when the notification was created
  });
  const notification = mongoose.model("notify" , NotificationSchema);
  module.exports= notification