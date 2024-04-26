const passport = require("passport");
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {}

const User=require("../models/userModel");
const { compareSync } = require("bcrypt");

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

      if (user) {
        // Update the refresh token if user already exists
        user.refreshToken = refreshToken;
      } else {
        // If user doesn't exist, create a new one
        user = new User({
          googleId: profile.id,
          username: profile.displayName,
          refreshToken: refreshToken,
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


opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECERET;

passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
  User.findOne({ id: jwt_payload.id }, function (err, user) {
      if (err) {
          return done(err, false);
      }
      if (user) {
          return done(null, user);
      } else {
          return done(null, false);
      }
  });
}));



module.exports = passport;