var express = require('express');
var router = express.Router();

let mongoose = require('mongoose');
let Question = mongoose.model('Question');
let Comment = mongoose.model('Comment');
let Group = mongoose.model('Group');
let User = mongoose.model('User');
let Chatroom = mongoose.model('Chatroom');
let jwt = require('express-jwt');

let auth = jwt({ secret: process.env.STUDYBUD_BACKEND_SECRET });

router.get('/users', auth, function (req, res, next) {
    let query = User.find({ autopopulate: false });
    query.exec(function (err, comments) {
        if (err) {
            return next(err);
        }

        res.json(comments);
    });
});

router.post('/chatroom/', function (req, res, next) {
    User.findById(req.body.user1Id, function (err, usr1) {
        console.log(req.body);
        if (err) {
            return next(err);
        }

        let us1 = usr1;

        User.findById(req.body.user2Id, function (err, usr2) {
            if (err) {
                return next(err);
            }

            let us2 = usr2;
            let chatroom = new Chatroom(req.body);
            chatroom.user1 = us1;
            chatroom.user2 = us2;

            chatroom.save(function (err, chat) {
                if (err) {

                    return next(err);

                }

                us1.chatrooms.push(chat);
                let c = chat;
                us1.save(function (err, urs) {
                    if (err) {
                        return next(err);
                    }


                });
                us2.save(function (err, urs) {
                    if (err) {
                        return next(err);
                    }

                    res.json(chat);
                });


            });
        });

    });
})

module.exports = router;
