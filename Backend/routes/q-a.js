const express = require('express')

const router = express.Router()

const {addquestion,addanswer,getQuestion, deleteQuestion, updateQuestion,deleteAnswer,updateAnswer} = require('../controllers/q-aController')

router.post("/question",addquestion)

router.post("/answer",addanswer)

router.get("/queries",getQuestion)

router.delete("/delquestion/:id",deleteQuestion)

router.patch("/updatequestion/:id",updateQuestion)

router.delete("/delanswer/:id",deleteAnswer)

router.patch("/updateanswer/:id",updateAnswer)

module.exports = router
