const express = require('express')

const router = express.Router()

const {addquestion,addanswer,getQuestion} = require('../controllers/q-aController')

router.post("/question",addquestion)

router.post("/answer",addanswer)

router.get("/queries",getQuestion)

module.exports = router
