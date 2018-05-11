let mongoose = require('mongoose');
let autopopulate = require("mongoose-autopopulate");

let MessageSchema = new mongoose.Schema({
    message: String,
    created: Date,
    author: String,
    receiver: String
});

MessageSchema.plugin(autopopulate);

// QuestionSchema.pre('remove', function (next) {
//     this.model('group').update({},
//         { $pull: { questions: this._id } },
//         { safe: true, multi: true },
//         next);
// });

mongoose.model('Message', MessageSchema);