const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require('dotenv').config();
const auth= require("./routes/authRoute.js")
const port = process.env.PORT; 
const Messages = require("./routes/messageSendingRoute.js")
const users = require("./routes/userRoutes.js")
const group = require("./routes/GroupChatRoutes.js")
app.use(cors({
  origin: 'http://localhost:5173',  
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());


mongoose.connect(process.env.mongoURL)
  .then(() => console.log("Database connected"))
  .catch((error) => {
    console.error("Database connection error:", error);
  });

  app.use("/auth" , auth);
  app.use("/messages" , Messages);
  app.use("/users" , users);
  app.use("/groupChats" , group)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 