const User = require('../models/userModel');
const { hashSync, compareSync } = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
require('../middleware/passport');

// Helper functions
const createTokens = (user) => {
  const payload = {
    username: user.username,
    id: user._id
  };
  const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
  const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
  return { token, refreshToken };
};


const signupUser = async (req, res) => {
  const { username, password, email } = req.body;
  
  // Username must start with a capital letter
  if (!/^[A-Z]/.test(username)) {
    return res.status(400).json({
      success: false,
      message: "Username must start with a capital letter."
    });
  }

  // Validate email format and community email IDs
  const emailRegex = /^[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,24}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Invalid email format."
    });
  }

  try {
    // Check if username or email already exists
    const existingUser = await User.findOne({
      $or: [{ username: username }, { email: email }]
    });

    if (existingUser) {
      if (existingUser.username === username) {
        return res.status(409).send({
          success: false,
          message: "Username is already taken."
        });
      }
      if (existingUser.email === email) {
        return res.status(409).send({
          success: false,
          message: "Email is already taken."
        });
      }
    }

    // Validate password complexity
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*])(?=.*[A-Z]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).send({
        success: false,
        message: "Password must contain at least one letter, one symbol, one capital letter, and be at least 8 characters long."
      });
    }

    // Create new user and hash password
    const newUser = new User({
      username,
      password: hashSync(password, 10), // Ensure you've imported hashSync from bcrypt
      email
    });

    await newUser.save();

    const payload = {
      id: newUser._id,
      username: newUser.username
    };

    const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' }); // Access token
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' }); // Refresh token


    // Successfully created the user
    res.status(201).send({ 
      success: true,
      message: "User created successfully.",
      user: {
        id: newUser._id,
        username: newUser.username
      },
      token: `Bearer ${token}`,
      refreshToken
    });

  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error: err.message
    });
  }
};





const loginUser = async (req, res) => {
  const { username, password } = req.body;

  // Validate the username format before attempting to find the user


  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ success: false, message: "Could not find the user." });
    }
    if (!compareSync(password, user.password)) {
      return res.status(401).json({ success: false, message: "Incorrect password" });
    }

    const { token, refreshToken } = createTokens(user);
    user.refreshToken = refreshToken;
    await user.save();

    res.json({  
      success: true,
      message: "Logged in successfully!",
      token: "Bearer " + token,
      refreshToken
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "An error occurred", error: err.message });
  }
};



const google = (req, res, next) => {
  passport.authenticate('google', { scope: ['email', 'profile'] })(req, res, next);
};


const googlecallback = (req, res, next) => {
  passport.authenticate('google', async (err, user, info) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Error authenticating with Google.", error: err });
    }
    if (!user) {
      return res.status(401).json({ success: false, message: "Google authentication failed." });
    }

    try {
      const payload = {
        id: user._id,
        username: user.username,
      };

      // Generate access token
      const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });

      // Generate refresh token
      const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

      // Store refresh token in MongoDB
      user.refreshToken = refreshToken;
      await user.save();


      res.cookie('username', user.username, { httpOnly: true }); // You can set other options as needed

      // Redirect user after successful login
      res.redirect('http://localhost:5173/');

    } catch (error) {
      res.status(500).json({ success: false, message: "An error occurred", error: error.message });
    }
  })(req, res, next);
};



module.exports = { signupUser,loginUser,google,googlecallback};
