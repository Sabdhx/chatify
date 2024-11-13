const cookieParser = require('cookie-parser');
const express = require("express");
const jwt = require('jsonwebtoken');
const app = express();
require('dotenv').config();

app.use(cookieParser());

const tokenIdentifier = async (req, res, next) => {
 const token = req.cookies.token;

  const decoded = jwt.decode(token);
//   console.log(decoded)
   req.sender = decoded.id
next();
  
};

module.exports = { tokenIdentifier };


