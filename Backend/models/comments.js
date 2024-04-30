const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema({
    answerId:{
        type:String,
        required:true
    },
    user:{
        type:String,
        required:true
    },
    comments:{
        type:String,
        required:true
    }
});
const Comments =mongoose.model('Comment', commentSchema);

module.exports = Comments
