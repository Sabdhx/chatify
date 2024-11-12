const express = require("express")
const router = express.Router();
const {deleteUser, signup, login, google} = require("../controlllers/auth.js");


router.post("/register", signup);
router.post("/login", login);
router.delete("/delete/:id",deleteUser)
router.get("/logout",deleteUser)
router.post("/google",google)

module.exports = router
