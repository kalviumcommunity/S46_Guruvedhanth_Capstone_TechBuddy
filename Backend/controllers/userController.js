const User = require('../models/userModel');
const { hashSync, compareSync } = require('bcrypt');


const signupUser = async (req, res) => {
  const { username, password,email} = req.body;

  // Check if user already exists
  try {
    const existingUser = await User.findOne({ username: username });
    if (existingUser) {
      return res.status(409).send({ 
        success: false,
        message: "Username is already taken."
      });
    }

    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*])(?=.*[A-Z]).{8,}$/;

    if (!passwordRegex.test(password)) {
      return res.status(400).send({ 
        success: false,
        message: "Password must contain at least one letter, one symbol, one capital letter, and be at least 8 characters long."
      });
    }
    const newUser = new User({
      username,
      password: hashSync(password, 10) 
    });

    await newUser.save();

    res.status(201).send({ 
      success: true,
      message: "User created successfully.",
      user: {
        id: newUser._id,
        username: newUser.username
      },
    });

  } catch (err) {
    res.status(500).send({ // 500 Internal Server Error
      success: false,
      message: "Something went wrong",
      error: err.message
    });
  }
};



const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ success: false, message: "Could not find the user." });
    }
    if (!compareSync(password, user.password)) {
      return res.status(401).json({ success: false, message: "Incorrect password" });
    }

    res.json({
      success: true,
      message: "Logged in successfully!",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "An error occurred", error: err });
  }
};


module.exports = { signupUser,loginUser};