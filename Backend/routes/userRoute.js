const express = require('express')
const router = express.Router()

const {signupUser,loginUser,google,googlecallback} = require('../controllers/userController')
const passport = require('passport')


router.post('/signup',signupUser)

router.post("/login",loginUser)

router.get("/google",google)

router.get("/google/callback", googlecallback);

module.exports = router

