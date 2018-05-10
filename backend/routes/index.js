var express = require('express');
var router = express.Router();

let mongoose = require('mongoose');
let Question = mongoose.model('Question');
let Comment = mongoose.model('Comment');
let User = mongoose.model('User');
let jwt = require('express-jwt');
let fs = require('fs');


let auth = jwt({ secret: process.env.STUDYBUD_BACKEND_SECRET });

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send('server is up');
});

router.get('/API/comments', auth, function (req, res, next) {
  let query = Comment.find().populate('comments');
  query.exec(function (err, comments) {
    if (err) {
      return next(err);
    }

    res.json(comments);
  });
});

router.get('/API/questions', auth, function (req, res, next) {
  let query = Question.find();
  query.exec(function (err, questions) {
    if (err) {
      return next(err);
    }

    // console.log(questions);
    res.json(questions);
  });
});

router.get('/API/question/:question', auth, function (req, res, next) {
  res.json(req.question);
});

router.post('/API/questions', function (req, res, next) {
  Comment.create(req.body.comments, function (err, comm) {
    if (err) {
      return next(err);
    }

    User.findById(req.body.authorId, function (err, usr) {
      if (err) {
        return next(err);
      }


      let question = new Question({
        description: req.body.description,
        created: req.body.created,

        likes: req.body.likes,
        dislikes: req.body.dislikes,
        contentType: req.body.contentType,
        dataImage: req.body.dataImage,
        hasSolution: req.body.hasSolution
      });

      question.author = usr;
      question.comments = comm;
      question.save(function (err, q) {
        if (err) {
          // removing comments because we are in a error
          Comment.remove({ _id: { $in: question.comments } });
          return next(err);
        }


        res.json(q);
      });
    });



  });
});

router.param('question', function (req, res, next, id) {
  let query = Question.findById(id);
  query.exec(function (err, question) {
    if (err) {
      return next(err);
    }
    if (!question) {
      return next(new Error('not found ' + id));
    }
    req.question = question;
    return next();
  });
});

router.param('comment', function (req, res, next, id) {
  let query = Comment.findById(id);
  query.exec(function (err, comment) {
    if (err) {
      return next(err);
    }
    if (!comment) {
      return next(new Error('not found ' + id));
    }
    req.comment = comment;
    return next();
  });
});

router.param('group', function (req, res, next, id) {
  let query = Group.findById(id);
  query.exec(function (err, group) {
    if (err) {
      return next(err);
    }
    if (!group) {
      return next(new Error('not found ' + id));
    }
    req.group = group;
    return next();
  });
});

router.delete('/API/question/:question', function (req, res) {
  Comment.remove({ _id: { $in: req.question.comments } }, function (err) {
    if (err) return next(err);
    req.question.remove(function (err) {
      if (err) {
        return next(err);
      }
      res.json(req.question);
    });
  });
});

router.put('/API/question/:question', auth, function (req, res) {
  let question = req.question;

  question.description = req.body.description;
  // question.comments = req.body.comments;

  question.likes = req.body.likes;
  question.dislikes = req.body.dislikes;
  question.created = req.body.created;
  question.hasSolution = req.body.hasSolution;

  question.save(function (err) {
    if (err) {
      return res.send(err);
    }
    res.json(req.body);
  });
});



router.put('/API/comment/:comment', auth, function (req, res) {
  let comment = req.comment;

  comment.message = req.body.message;

  comment.likes = req.body.likes;
  comment.dislikes = req.body.dislikes;
  comment.created = req.body.created;
  comment.questionId = req.body.questionId;
  comment.solution = req.body.solution;
  comment.save(function (err) {
    if (err) {
      return res.send(err);
    }
    res.json(req.body);
  });
});



router.post('/API/question/:question/comments', auth, function (req, res, next) {
  User.findById(req.body.authorId, function (err, usr) {

    let com = new Comment(req.body);
    com.author = usr;

    com.save(function (err, comment) {
      if (err) {
        return next(err);
      }

      req.question.comments.push(comment);
      req.question.save(function (err, question) {
        if (err) {

          return next(err);

        }
        res.json(comment);
      });
    });
  });
});

router.post('/API/comment/:comment', auth, function (req, res, next) {
  let com = new Comment(req.body);

  com.save(function (err, comment) {
    if (err) {
      return next(err);
    }

    req.comment.comments.push(comment);

    req.comment.save(function (err, comment) {
      if (err) {
        return next(err);
      }
      res.json(comment);
    })
  });
});

router.get('/API/group/:group', auth, function (req, res, next) {
  res.json(req.group);
});

router.post('/API/groups', auth, function (req, res, next) {
  User.findById(req.body.adminId, function (err, usr) {
    if (err) {
      return next(err);
    }


    let group = new Group({
      groupName: req.body.groupName,
      closedGroup: req.body.closedGroup,

    });

    group.admin = usr;
    group.questions = [];
    group.users = [];
    group.save(function (err, group) {
      if (err) {
        // removing questions because we are in a error
        return next(err);
      }

      res.json(group);
    });
  });
});


router.post('/API/finduser', function (req, res, next) {
  User.findOne({ username: req.body.username }, function (err, user) {
    if (err) {
      return next(err);
    }


    res.json({
      username: user.username,
      prof: user.prof,
      dataPF: user.dataPF,
      contentTypePF: user.contentTypePF,
      _id: user._id
    })


  });
});

module.exports = router;
