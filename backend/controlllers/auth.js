const userSchema = require("../models/user.js")
const dotenv = require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const signup = async (req, res) => {
  const { name, email, password, profilePicture } = req.body;
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
      process.env.secret,
      { expiresIn: age }
    );

    const { password: userPassword, ...userInfo } = user._doc;

    res.cookie("token", token, {
     sameSite:"Lax"
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


const logout = async (req, res) => {
  try {
    // Clear the token cookie by matching the domain and path
    res.clearCookie("token", {
      sameSite: "Lax",     // Same setting used when setting the cookie
      domain: "localhost", // Match the domain for local development
      path: "/",           // Match the path, usually '/'
      expires: new Date(0) // Expire the cookie by setting the date to 0 (past date)
    });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    console.error("Error during logout:", err);
    res.status(500).json({ message: "Failed to log out" });
  }
};




// const LoginWithGoogle = async (req, res) => {
//   const { name, email, profilePicture } = req.body;
//   const age = 100 * 50 * 100
//   console.log(req.body)
//   let user = await userSchema.findOne({ email });
//   if (user) {

//     const age = 1000 * 60 * 60 * 24 * 7;
//     const token = jwt.sign(
//       {
//         email: user.email,
//         name: user.name,
//         profilePicture,
//         id: user._id,
//       },
//       process.env.secret,
//       { expiresIn: age }
//     );

//     const { password: userPassword, ...userInfo } = user._doc;

//     res.cookie("token", token,
//       {
//         httpOnly: false,
//         secure: false,
//         sameSite: 'None',
//         path: '/'
//       },
//     ).status(200).json(userInfo);

//   } else {
//     const password = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
//     const hashedPasword = bcrypt.hashSync(password, 10);

//     const userMaking = await userSchema.create(
//       {
//         name,
//         email,
//         profilePicture,
//         password: hashedPasword
//       }
//     )
//     const token = jwt.sign(
//       {
//         email: userMaking.email,
//         name: userMaking.name,
//         id: userMaking._id,
//       },
//       process.env.secret,
//       { expiresIn: age }
//     );

//     const { password: userPassword, ...userInfo } = userMaking._doc;

//     res.cookie("token",
//       {
//         httpOnly: false,
//         secure: false,
//         sameSite: 'lax',
//         path: '/'
//       }, {
//       httpOnly: true
//     }).status(200).json(userInfo);
//   }
// }



 const google = async (req, res, next) => {
  try {
    const user = await userSchema.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.secret);
      console.log(token)

      const { password: pass, ...rest } = user._doc;
      res
        .cookie('token', token, {
        sameSite:"Lax" 
        })
        .status(200)
        .json(rest);
        res.status(200).json(user);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
      const newUser = new userSchema({
        name:
          req.body.name.split(' ').join('').toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        profilePicture: req.body.profilePicture,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.secret);
      console.log(token)

      const { password: pass, ...rest } = newUser._doc;
      res
        .cookie('token', token, {        sameSite:"Lax" 
        })
        .status(200)
        .json(rest);
    }
    res.status(200).json(newUser)
  } catch (error) {
    next(error);
  }
};




module.exports = { logout, signup, deleteUser, login, google };
