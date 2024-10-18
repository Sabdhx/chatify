const chatSchema = new mongoose.Schema({
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
      },
    ],
    lastMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message', // Reference to the Message model
    },
    chatType: {
      type: String,
      enum: ['one-on-one', 'group'], // Specify chat type
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
  