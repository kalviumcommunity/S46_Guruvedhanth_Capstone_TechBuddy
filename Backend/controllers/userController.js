const User = require('../models/userModel');
const { hashSync, compareSync } = require('bcrypt');
const jwt = require('jsonwebtoken');

// Helper functions
const createTokens = (user) => {
  const payload = {
    username: user.username,
    id: user._id
  };
  const token = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '7d' });
  return { token };
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

  // Validate email format
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
      password: hashSync(password, 10),
      email
    });

    await newUser.save();

    const { token } = createTokens(newUser);

    newUser.token = token;
    await newUser.save();

    // Set cookies for username and token
    // res.cookie('username', newUser.username, { httpOnly: true });
    // res.cookie('token', token, { httpOnly: true });

    res.status(201).send({
      success: true,
      message: "User created successfully.",
      user: {
        id: newUser._id,
        username: newUser.username,
        token: token
      },
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

  try {
    // Check if a valid token exists in cookies
    const token = req.cookies.token;
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        return res.status(400).json({ success: false, message: "You are already logged in." });
      } catch (err) {
        // Token is invalid or expired, proceed with login
      }
    }

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ success: false, message: "Could not find the user." });
    }
    if (!compareSync(password, user.password)) {
      return res.status(401).json({ success: false, message: "Incorrect password" });
    }

    const { token: newToken } = createTokens(user);

    user.token = newToken;
    await user.save();

    res.json({
      success: true,
      message: "Logged in successfully!",
      user: {
        username: user.username,
        token: newToken
      }
    });

  } catch (err) {
    res.status(500).json({ success: false, message: "An error occurred", error: err.message });
  }
};

const logoutUser = async (req, res) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(400).json({ success: false, message: "No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ success: false, message: "User not found." });
    }

    user.token = null;
    await user.save();

    res.clearCookie('token');
    res.clearCookie('username');

    res.json({
      success: true,
      message: "Logged out successfully!"
    });

  } catch (err) {
    res.status(500).json({ success: false, message: "An error occurred", error: err.message });
  }
};


module.exports = { signupUser, loginUser, logoutUser   };
