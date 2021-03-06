var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
let passport = require("passport");
let jwt = require('express-jwt');


/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', function (req, res, next) {
  if (!req.body.username || !req.body.password) {
    console.log(req.body)
    return res.status(400).json(
      { message: 'Please fill out all fields' });
  }
  
  let user = new User();
  user.username = req.body.username;
  user.dataPF = req.body.dataPF;
  user.contentTypePF = req.body.contentTypePF;
  user.prof = req.body.prof;
  user.setPassword(req.body.password);
  user.save(function (err, usr) {
    if (err) {
      return next(err);
    }
    return res.json({ 
      token: user.generateJWT()
    })
  });
});

router.post('/login', function (req, res, next) {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json(
      { message: 'Please fill out all fields' });
  }
  passport.authenticate('local', function (err, user, info) {
    if (err) { return next(err); }
    if (user) {
      return res.json({ token: user.generateJWT() });
    } else {
      return res.status(401).json(info);
    }
  })(req, res, next);
});

router.post('/checkusername', function(req, res, next) {
  User.findOne({username: req.body.username}, 
    function(err, result) {
      if (result !== null) {
        res.json({'username': 'alreadyexists'})
      } else {
        res.json({'username': 'ok'})
      }
  });
});

router.post('/userUpdate', function (req, res, next) {
  
  User.findById(req.body._id, function (err, user) {
    if (err) {
      return next(err);
    }


    user.prof = req.body.prof;
    user.dataPF = req.body.dataPF;
    user.contentTypePF = req.body.contentTypePF;
    user.joinedGroups = req.body.joinedGroups;

    user.save(function(err, usr){
      if (err){
        return next(err);
      }

      res.json({'userupdated': 'ok'})
    });
  });
});



module.exports = router;
