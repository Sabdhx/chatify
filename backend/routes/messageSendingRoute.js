const express = require("express");
const { messageSend, allMessages, filteringChats, deleteMessage, editMessage } = require("../controlllers/Messages");
const { tokenIdentifier } = require("../middleWare/tokenIdentifier");
const router = express.Router();


router.post("/sendMessage/:id" ,tokenIdentifier, messageSend)
router.get("/allMessages" , allMessages)
router.get("/filterChats",filteringChats)
router.delete("/delete/:id", deleteMessage)
router.post("/edit/:id", editMessage)

module.exports = router;
