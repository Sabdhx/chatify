const express = require("express");
const { tokenIdentifier } = require("../middleWare/tokenIdentifier");
const { allUsersIncludingMe,singleUser,allUsers } = require("../controlllers/userController");
const router = express.Router();


router.get("/allUsers" ,tokenIdentifier,allUsers );
router.get("/user/:id" , tokenIdentifier, singleUser)
router.get("/allUsersIncludingMe" , allUsersIncludingMe, singleUser)

module.exports = router;