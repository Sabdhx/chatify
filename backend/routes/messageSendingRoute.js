const express = require("express");
const {getAllGc, messageSend, allMessages, filteringChats, deleteMessage, editMessage, notifyMe ,makeAgroup} = require("../controlllers/Messages");
const { tokenIdentifier } = require("../middleWare/tokenIdentifier");
const router = express.Router();


router.post("/sendMessage/:id" ,tokenIdentifier, messageSend)
router.get("/allMessages" ,tokenIdentifier, allMessages)
router.get("/filterChats",tokenIdentifier,filteringChats)
router.delete("/delete/:id", deleteMessage)
router.post("/edit/:id", editMessage)
router.post("/notify", notifyMe)
router.post("/GroupChat" , makeAgroup)
router.get("/getAllGc" , getAllGc)

module.exports = router;
