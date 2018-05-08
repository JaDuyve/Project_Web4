let mongoose = require('mongoose');

let QuestionSchema = new mongoose.Schema({
    description: String,
    created: Date,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    likes: [String],
    dislikes: [String],
    dataImage:  String,
    contentType: String,
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    hasSolution: Boolean
});

// QuestionSchema.pre('remove', function (next) {
//     this.model('group').update({},
//         { $pull: { questions: this._id } },
//         { safe: true, multi: true },
//         next);
// });

mongoose.model('Question', QuestionSchema);