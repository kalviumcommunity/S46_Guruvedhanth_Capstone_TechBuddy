const express = require('express')
// const passport =require("passport")
const router = express.Router()

const {signupUser,loginUser,google,googlecallback} = require('../controllers/userController')
const passport = require('passport')


router.post('/signup',signupUser)

router.post("/login",loginUser)

// router.post("/logout", passport.authenticate('jwt', { session: false }), logout);



router.get("/google",google)

router.get("/google/callback", googlecallback);

module.exports = router

