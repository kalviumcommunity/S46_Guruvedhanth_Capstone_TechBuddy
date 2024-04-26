const express = require('express')

const router = express.Router()

const {addquestion,addanswer,getQuestion, deleteQuestion, updateQuestion} = require('../controllers/q-aController')

router.post("/question",addquestion)

router.post("/answer",addanswer)

router.get("/queries",getQuestion)

router.delete("/delquestion/:id",deleteQuestion)

router.patch("/updatequestion/:id",updateQuestion)

module.exports = router
