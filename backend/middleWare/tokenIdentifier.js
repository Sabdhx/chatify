const cookieParser = require('cookie-parser');
const express = require("express");
const jwt = require('jsonwebtoken'); // Import jsonwebtoken
const app = express();
const dotenv = require('dotenv').config();

app.use(cookieParser());

const tokenIdentifier = async (req, res, next) => {
  const token = req.cookies.token;  // Adjust the cookie name if necessary

  if (!token) {
    return res.status(401).json({ message: "Unauthorized, token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.secret);  // Replace with your actual secret key
    console.log("Decoded Token:", decoded); // Logs the decoded token data
    req.user = decoded;
    next();  
  } catch (error) {
    console.error("Token verification failed:", error);
    return res.status(403).json({ message: "Forbidden, invalid token" });
  }
};

module.exports = { tokenIdentifier };


