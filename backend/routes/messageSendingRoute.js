const express = require("express");
const { messageSend, allMessages, filteringChats, deleteMessage, editMessage, notifyMe } = require("../controlllers/Messages");
const { tokenIdentifier } = require("../middleWare/tokenIdentifier");
const router = express.Router();


router.post("/sendMessage/:id" ,tokenIdentifier, messageSend)
router.get("/allMessages" ,tokenIdentifier, allMessages)
router.get("/filterChats",tokenIdentifier,filteringChats)
router.delete("/delete/:id", deleteMessage)
router.post("/edit/:id", editMessage)
router.post("/notify", notifyMe)

module.exports = router;
