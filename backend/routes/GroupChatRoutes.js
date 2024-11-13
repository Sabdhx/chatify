const express = require("express")
const router = express.Router();
const {sendMessageToGc,getAllGc,makeAgroup, FilterGroupChats} = require("../controlllers/GroupChats.js");


router.post("/GroupChat" , makeAgroup)
router.get("/getAllGc" , getAllGc);
router.get("/filterGroup" ,FilterGroupChats);
router.post("/sendMessageInGc/:id" , sendMessageToGc)

module.exports = router;
