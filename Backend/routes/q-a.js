const express = require('express');

const router = express.Router();

const {
  addquestion,
  addanswer,
  getQuestion,
  deleteQuestion,
  updateQuestion,
  updateEntireQuestion,
  getAnswer
} = require('../controllers/q-aController');

router.post("/question", addquestion);
router.post("/answer", addanswer);
router.get("/queries", getQuestion);
router.get("/queries/:id", getQuestion);
router.get("/result", getAnswer);
router.delete("/delquestion/:id", deleteQuestion);
router.patch("/updatequestion/:id", updateQuestion);
router.put("/updateentirequestion/:id", updateEntireQuestion);

module.exports = router;
