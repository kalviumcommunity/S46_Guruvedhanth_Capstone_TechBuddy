const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const questionSchema = new Schema({
    title:{
        type:String,
        required: true,
    },
    category:{
        type:String,
        required:true,
        enum:["python","javascript","cpp"]
    },
    code:{
        type:String,
    },
    description:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        // required:true
    }
});


module.exports = mongoose.model('Question', questionSchema);
