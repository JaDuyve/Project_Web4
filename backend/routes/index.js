var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
let Question = mongoose.model('Question');
let Comment = mongoose.model('Comment');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');
let jwt = require('express-jwt');

let auth = jwt({secret: process.env.STUDYBUD_BACKEND_SECRET});

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send('server is up');
});

router.get('/API/questions', function (req, res, next) {
  let query = Question.find().populate('comments');
  query.exec(function (err, questions) {
    if (err) {
      return next(err);
    }

    res.json(questions);
  });
});


router.post('/API/questions', function (req, res, next) {
  Comment.create(req.body.comments, function (err, comm) {
    if (err) {
      return next(err);
    }
    console.log(req.body.description + " " + req.body.author);

    let question = new Question({
      description: req.body.description,
      created: req.body.created,
      author: req.body.author,
      likes: req.body.likes,
      dislikes: req.body.dislikes
    });
    console.log(question);

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

router.put('/API/question/:question', function (req, res) {
  let question = new Question(req.body);

  question.save(function (err) {
    if (err) {
      return next(err);
    }
    res.json(req.body);
  });
});

router.post('/API/question/:question/comments', function (req, res, next) {
  let com = new Comment(req.body);

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

router.post('/API/comment/:comment/comments', function (req, res, next) {
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

module.exports = router;
