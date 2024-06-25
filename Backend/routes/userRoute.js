const express = require('express')
// const passport =require("passport")
const router = express.Router()

const {signupUser,loginUser} = require('../controllers/userController')
const passport = require('passport')


router.post('/signup',signupUser)

router.post("/login",loginUser)

module.exports = router

