const userSchema = require("../models/user.js")
const dotenv = require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

 const signup = async (req, res) => {
  const { name, email, password,profilePicture} = req.body;
  console.log("name :" + name);
  console.log("email :" + email);
  console.log("password :" + password);
  console.log("profilePicture :" + profilePicture);

  try {
     const newUser = await userSchema.create({
        name,
        email,
        password,
        profilePicture
      });
    

    res.status(201).json({ message: "Registration successful!", user: newUser });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


 const login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      let user = await userSchema.findOne({ email });
      const age = 1000 * 60 * 60 * 24 * 7; 
      const token = jwt.sign(
        {
          email: user.email,
          name: user.name,
          id: user._id,
        },
        process.env.secret  ,
        { expiresIn: age }
      );
  
      const { password: userPassword, ...userInfo } = user._doc;
  
      res.cookie("token", token, {
        maxAge: age,
   
        sameSite: 'Lax',
      }).status(200).json(userInfo);
  
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Failed to login!" });
    }
  };


const deleteUser = async (req, res) => {
    const id = req.params.id;
    const response = await userSchema.findByIdAndDelete(id);
    res.status(200).json(response)
}



module.exports = { signup, deleteUser,login };
