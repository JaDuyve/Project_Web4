let mongoose = require('mongoose');
let autopopulate = require("mongoose-autopopulate");


let GroupSchema = new mongoose.Schema({
    groupName: {
        type: String,
        lowercase: true,
        unique: true
    },
    admin: {type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            autopopulate: {select: 'username prof dataPF contentTypePF'}},
    // groupCategory: String,
    closedGroup: Boolean,
    questions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
        autopopulate: true
    }]
    ,
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        autopopulate: {select: 'username prof dataPF contentTypePF'}
    }]
    
    
});
GroupSchema.plugin(autopopulate);


mongoose.model('Group', GroupSchema);