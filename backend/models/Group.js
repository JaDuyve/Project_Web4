let mongoose = require('mongoose');

let GroupSchema = new mongoose.Schema({
    groupName: String,
    groupCategory: String,
    closedGroup: Boolean,
    questions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
    }]
    ,
    Users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
    
    
});

mongoose.model('Question', QuestionSchema);