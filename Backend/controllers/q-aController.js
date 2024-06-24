const Question = require("../models/question");
const Answer = require("../models/answer");
const mongoose=require("mongoose")


const addquestion = async (req, res) => {
    try {
        const { title, category, code, description, username } = req.body;

        if (!title || !description || !category || !username) {
            return res.status(400).json({ error: "Question, description, category, and username are required." });
        }

        if (title.length < 5 || title.length > 25) {
            return res.status(400).json({ error: "Question must be between 5 and 25 characters long." });
        }

        if (description.length < 25 || description.length > 250) {
            return res.status(400).json({ error: "Description must be between 25 and 250 characters long." });
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
        const { answer, code, explanation, username,questionId,category} = req.body;

        if (!answer || !code || !explanation || !username ||!questionId) {
            return res.status(400).json({ error: "Answer, code, explanation, questionId and username are required." });
        }

        if (answer.length < 5) {
            return res.status(400).json({ error: "Answer must be between 5 and 25 characters long." });
        }

        if (explanation.length < 25 || explanation.length > 250) {
            return res.status(400).json({ error: "Explanation must be between 25 and 250 characters long." });
        }

        const newAnswer = new Answer({
            answer,
            code,
            explanation,
            username,
            questionId,
            category
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

const getAnswer = async(req,res)=>{
    const answers=await Answer.find({}).sort({createdAt:-1})
    res.status(200).json(answers)
}

const deleteQuestion = async (req, res) => {
    const { id } = req.params;
    console.log("Attempting to delete question with ID:", id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
        console.log("Invalid ID format received:", id);
        return res.status(404).json({ error: "Invalid ID format" });
    }

    try {
        const question = await Question.findOneAndDelete({ _id: id });
        if (!question) {
            console.log("No question found with ID:", id);
            return res.status(404).json({ error: "No such question" });
        }
        res.status(200).json(question);
    } catch (error) {
        console.error("Error during deletion:", error);
        res.status(500).json({ error: "Error deleting the question: " + error.message });
    }
};

const updateQuestion = async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;

    console.log("Attempting to update question with ID:", id);

    try {

        const question = await Question.findByIdAndUpdate({ _id: id }, req.body);


        if (!question) {
            console.log("No question found with ID:", id);
            return res.status(404).json({ error: "No such question" });
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            console.log("Invalid ID format received:", id);
            return res.status(404).json({ error: "Invalid ID format" });
        }
    
        // Check if update data is empty
        if (!question.title || !question.description) {
            // console.log("Title or description is missing");
            return res.status(400).json({ error: "Title and description are required" });
        }
    
        if (question.title.length > 5 && question.title.length < 25) {
            // console.log("Title length is not between 5 and 25 characters");
            return res.status(400).json({ error: "Title must be between 5 and 25 characters long" });
        }
    
        if (question.description.length > 25 && question.description.length < 250) {
            // console.log("Description length is not between 25 and 50 characters");
            return res.status(400).json({ error: "Description must be between 25 and 250 characters long" });
        }
    
        res.status(200).json(question);
    } catch (error) {
        console.error("Error during updating:", error);
        res.status(500).json({ error: "Error: " + error.message });
    }
};


const updateEntireQuestion = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body; // Assuming update data is sent in the request body
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log("Invalid ID format received:", id);
      return res.status(404).json({ error: "Invalid ID format" });
    }
  
    try {
      const question = await Question.findByIdAndUpdate(id, updateData, { new: true });
      if (!question) {
        console.log("No question found with ID:", id);
        return res.status(404).json({ error: "No such question" });
      }
      res.status(200).json(question);
    } catch (error) {
      console.error("Error during updating:", error);
      res.status(500).json({ error: "Error updating the question: " + error.message });
    }
  };
  




module.exports = { addquestion, addanswer ,getQuestion,deleteQuestion,updateQuestion,updateEntireQuestion,getAnswer};
