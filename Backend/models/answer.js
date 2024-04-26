const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const answerSchema = new Schema({
    answer:{
        type:String,
        required:true,
    },
    code:{
        type:String,
    },
    explanation:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true
    },
    questionId:{
        type:String,
        required:true
    }
});


module.exports = mongoose.model('Answer', answerSchema);
