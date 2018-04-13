let mongoose = require('mongoose');

let QuestionSchema = new mongoose.Schema({
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

// QuestionSchema.pre('remove', function (next) {
//     this.model('group').update({},
//         { $pull: { questions: this._id } },
//         { safe: true, multi: true },
//         next);
// });

mongoose.model('Question', QuestionSchema);