const express = require("express")
const router = express.Router();
const {deleteUser, signup, login, google, logout} = require("../controlllers/auth.js");


router.post("/register", signup);
router.post("/login", login);
router.delete("/delete/:id",deleteUser)
router.post("/logout",logout)
router.post("/google",google)

module.exports = router
