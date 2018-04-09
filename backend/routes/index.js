var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
let Question = mongoose.model('Question');
let Comment = mongoose.model('Comment');

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
    let question = new Question({
      description: req.body.description,
      created: req.body.created,
      author: req.body.author,
      likes: req.body.likes,
      dislikes: req.body.dislikes
    });

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

module.exports = router;
