const passport = require("passport");
const User = require("../models/userModel");

const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/api/users/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Search for an existing user with the given Google ID
      let user = await User.findOne({ googleId: profile.id });

      if (!user) {
        // If user doesn't exist, create a new one
        user = new User({
          googleId: profile.id,
          username: profile.displayName,
        });
      }

      // Save changes or new user
      await user.save();
      return done(null, user);
    } catch (error) {
      return done(error, null);
    }
  }
));

passport.serializeUser(function(user, cb) {
    cb(null,user.id)
});
  
passport.deserializeUser(async function(id, done) {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;