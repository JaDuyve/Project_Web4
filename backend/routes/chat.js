var express = require('express');
var router = express.Router();

let mongoose = require('mongoose');
let Question = mongoose.model('Question');
let Comment = mongoose.model('Comment');
let Group = mongoose.model('Group');
let User = mongoose.model('User');
let Chatroom = mongoose.model('Chatroom');
let Message = mongoose.model('Message');

let jwt = require('express-jwt');

let auth = jwt({ secret: process.env.STUDYBUD_BACKEND_SECRET });

router.get('/users', auth, function (req, res, next) {
    let query = User.find();
    query.exec(function (err, comments) {
        if (err) {
            return next(err);
        }
        console.log(comments);
        res.json(comments);
    });
});

router.post('/chatroom', auth, function (req, res, next) {
    User.findById(req.body.user1Id, function (err, usr1) {
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

                us1.chatrooms.push(chat._id);
                us2.chatrooms.push(chat._id);
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


router.param('chatrooms', function (req, res, next, id) {
    let query = User.findOne({ username: id });
    query.exec(function (err, user) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return next(new Error('not found ' + id));
        }
        req.user = user;
        return next();
    });
});

router.get('/chatrooms/:chatrooms', function (req, res, next) {

    let userChats = req.user.chatrooms;


    Chatroom.find({
        '_id': { $in: userChats.map(val => mongoose.Types.ObjectId(val)) }
    }, function (err, docs) {
        console.log(docs);
        res.json(docs);
    });

});
router.param('chatroom', function (req, res, next, id) {

    let query = Chatroom.findById(id);
    query.exec(function (err, chatroom) {
        if (err) {
            return next(err);
        }
        if (!chatroom) {
            return next(new Error('not found ' + id));
        }
        console.log(chatroom);
        req.chatroom = chatroom;
        return next();
    });
});

router.post('/chatroom/:chatroom/message', function (req, res, next) {
    let chatroom = req.chatroom;

    let message = new Message({
        message: req.body.message,
        created: req.body.created,
        author: req.body.author
    });

    message.save(function (err, msg) {
        if (err) {
            return next(err);
        }
        console.log(chatroom);
        chatroom.Messages.push(msg);
        chatroom.lastMessage = msg.created;
        chatroom.lastMess = msg.message;

        chatroom.save(function (err, chatroom) {
            if (err) {
                Message.remove({ _id: { $in: chatroom.Messages } });
                return next(err);
            }

            res.json(msg);
        })
    });
});



module.exports = router;
