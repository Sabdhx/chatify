const userSchema = require("../models/user.js")
const dotenv = require('dotenv').config();
const jwt = require('jsonwebtoken');


const storingUserInfo = async (req, res) => {
    const { email, username, profilePicture } = req.body;
    const authHeader = req.headers.authorization;
    const decoded = jwt.decode(authHeader); // Decode the token
    console.log(decoded)

   

    // Use email directly
    const findEmail = await userSchema.findOne({ email });

    if (findEmail) {

        return res.status(500).json({ message: "there is already a user with this email" });


    }

    const response = await userSchema.create(req.body);
    res.status(200).json(response);
}

const deleteUser = async (req, res) => {
    const id = req.params.id;
    const response = await userSchema.findByIdAndDelete(id);
    res.status(200).json(response)
}

const allUsers = async (req, res) => {
    const response = await userSchema.find();
    res.status(200).json(response);
}

module.exports = { storingUserInfo, deleteUser, allUsers };
