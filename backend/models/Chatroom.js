let mongoose = require('mongoose');
let autopopulate = require("mongoose-autopopulate");

let ChatroomSchema = new mongoose.Schema({
    lastMessage: Date,
    user1: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        autopopulate: {select: 'username prof dataPF contentTypePF'}
    },
    user2: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        autopopulate: {select: 'username prof dataPF contentTypePF'}
    },
    
    Messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message', autopopulate: true
    }],
    lastMess: String
});

ChatroomSchema.plugin(autopopulate);

// QuestionSchema.pre('remove', function (next) {
//     this.model('group').update({},
//         { $pull: { questions: this._id } },
//         { safe: true, multi: true },
//         next);
// });

mongoose.model('Chatroom', ChatroomSchema);