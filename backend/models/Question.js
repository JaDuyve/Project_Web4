let mongoose = require('mongoose');

let QuestionSchema = new mongoose.Schema({
    title: String,
    description: String,
    created: Date,
    author: String,
    likes: Number,
    dislikes: Number,
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
});

mongoose.model('Question', QuestionSchema);