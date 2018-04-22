let mongoose = require('mongoose');

let CommentSchema = new mongoose.Schema({
    message: String,
    created: { type: Date, default: Date.now },
    author: String,
    likes: [String],
    dislikes: [String],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    questionId: String

})

CommentSchema.pre('remove', function (next) {
    this.model('Question').update({},
        { $pull: { comments: this._id } },
        { safe: true, multi: true },
        next);
});

mongoose.model('Comment', CommentSchema);