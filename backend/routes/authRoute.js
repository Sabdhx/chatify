const express = require("express")
const router = express.Router();
const {storingUserInfo,deleteUser,allUsers} = require("../controlllers/auth.js");
const {tokenIdentifier} = require("../middleWare/tokenIdentifier.js");


router.post("/createUser", storingUserInfo);
router.delete("/delete/:id",deleteUser)
router.get("/users",tokenIdentifier,allUsers)

module.exports = router
