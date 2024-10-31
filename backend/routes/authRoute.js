const express = require("express")
const router = express.Router();
const {deleteUser, signup, login} = require("../controlllers/auth.js");


router.post("/register", signup);
router.post("/login", login);
router.delete("/delete/:id",deleteUser)

module.exports = router
