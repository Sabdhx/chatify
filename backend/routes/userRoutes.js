const express = require("express");
const { tokenIdentifier } = require("../middleWare/tokenIdentifier");
const { singleUser,allUsers } = require("../controlllers/userController");
const router = express.Router();


router.get("/allUsers" ,tokenIdentifier,allUsers );
router.get("/user/:id" , tokenIdentifier, singleUser)

module.exports = router;