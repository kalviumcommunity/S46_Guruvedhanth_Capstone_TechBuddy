const Question = require("../models/question");
const Answer = require("../models/answer");

const addquestion = async (req, res) => {
    try {
        const { title, category, code, description, username } = req.body;

        if (!title || !description || !category || !username) {
            return res.status(400).json({ error: "Title, description, category, and username are required." });
        }

        if (title.length < 5 || title.length > 25) {
            return res.status(400).json({ error: "Title must be between 5 and 25 characters long." });
        }

        if (description.length < 25 || description.length > 250) {
            return res.status(400).json({ error: "Description must be between 5 and 25 characters long." });
        }

        const question = new Question({
            title,
            category,
            code,
            description,
            username
        });

        const savedQuestion = await question.save();
        res.status(201).json({ message: 'Question added successfully', question: savedQuestion });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const addanswer = async (req, res) => {
    try {
        const { answer, code, explanation, username,questionId } = req.body;

        if (!answer || !code || !explanation || !username ||!questionId) {
            return res.status(400).json({ error: "Answer, code, explanation, and username are required." });
        }

        if (answer.length < 5 || answer.length > 25) {
            return res.status(400).json({ error: "Answer must be between 5 and 25 characters long." });
        }

        if (explanation.length < 25 || explanation.length > 250) {
            return res.status(400).json({ error: "Explanation must be between 5 and 25 characters long." });
        }

        const newAnswer = new Answer({
            answer,
            code,
            explanation,
            username,
            questionId
        });

        const savedAnswer = await newAnswer.save();
        res.status(201).json({ message: 'Answer added successfully', answer: savedAnswer });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getQuestion = async (req, res) => {
    const questions = await Question.find({}).sort({createdAt: -1})
    res.status(200).json(questions)
}

module.exports = { addquestion, addanswer ,getQuestion};
