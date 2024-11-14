const express = require("express")
const router = express.Router();
const {sendMessageToGc,getAllGc,makeAgroup, FilterGroupChats} = require("../controlllers/GroupChats.js");
const {tokenIdentifier} = require("../middleWare/tokenIdentifier.js")

router.post("/GroupChat" , makeAgroup)
router.get("/getAllGc" , getAllGc);
router.get("/filterGroup" ,FilterGroupChats);
router.post("/sendMessageInGc/:id" ,tokenIdentifier, sendMessageToGc)

module.exports = router;
