const express = require('express')

const router = express.Router()

const {addquestion,addanswer,getQuestion, deleteQuestion, updateQuestion,deleteAnswer,updateAnswer, updateEntireQuestion, updateEntireAnswer, getAnswer} = require('../controllers/q-aController')

router.post("/question",addquestion)

router.post("/answer",addanswer)

router.get("/queries",getQuestion)

router.get("/result",getAnswer)

router.delete("/delquestion/:id",deleteQuestion)

router.patch("/updatequestion/:id",updateQuestion)

router.delete("/delanswer/:id",deleteAnswer)

router.patch("/updateanswer/:id",updateAnswer)

router.put("/updateentirequestion/:id",updateEntireQuestion)

router.put("/updateentireanswer/:id",updateEntireAnswer)

module.exports = router
