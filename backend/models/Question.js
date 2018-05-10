let mongoose = require('mongoose');
let autopopulate = require("mongoose-autopopulate");

let QuestionSchema = new mongoose.Schema({
    description: String,
    created: Date,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        autopopulate: {select: 'username prof dataPF contentTypePF'}
    },
    likes: [String],
    dislikes: [String],
    dataImage:  String,
    contentType: String,
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment', autopopulate: true
    }],
    hasSolution: Boolean,
    sitsInGroup: Boolean
});

QuestionSchema.plugin(autopopulate);

// QuestionSchema.pre('remove', function (next) {
//     this.model('group').update({},
//         { $pull: { questions: this._id } },
//         { safe: true, multi: true },
//         next);
// });

mongoose.model('Question', QuestionSchema);