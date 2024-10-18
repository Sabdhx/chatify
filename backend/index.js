const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require('dotenv').config();
const auth= require("./routes/authRoute.js")
const port = process.env.PORT; 


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
    process.exit(1); 
  });

  app.use("/auth" , auth);



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 