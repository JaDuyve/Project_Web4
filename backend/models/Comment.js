let mongoose = require('mongoose');

let CommentSchema = new mongoose.Schema({
    message: String,
    created: { type: Date, default: Date.now },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    },
    likes: [String],
    dislikes: [String],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    questionId: String,
    dataImage: String,
    contextType: String
})

CommentSchema.pre('remove', function (next) {
    this.model('Question').update({},
        { $pull: { comments: this._id } },
        { safe: true, multi: true },
        next);
});

mongoose.model('Comment', CommentSchema);