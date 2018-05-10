let mongoose = require('mongoose');
let autopopulate = require("mongoose-autopopulate");

let CommentSchema = new mongoose.Schema({
    message: String,
    created: { type: Date, default: Date.now },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        autopopulate:{select: 'username prof dataPF contentTypePF'}
    },
    likes: [String],
    dislikes: [String],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment', autopopulate: true
    }],
    questionId: String,
    dataImage: String,
    contentType: String,
    solution: Boolean,
    authorPost: String
});
CommentSchema.plugin(autopopulate);



CommentSchema.pre('remove', function (next) {
    this.model('Question').update({},
        { $pull: { comments: this._id } },
        { safe: true, multi: true },
        next);
});

mongoose.model('Comment', CommentSchema);