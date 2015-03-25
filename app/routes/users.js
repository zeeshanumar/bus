var User = require('../models/user');
//var express = require('express');
//var router = express.Router();
var ObjectId  = require('mongoose').Types.ObjectId;

/***  Routes for /users ***/
//router.route('/users')

  // Create User at /api/users
exports.postUser = function (req, res) {
  var user = new User({
    username  : req.body.username,
    password  : req.body.password,
    email   : req.body.email,
    phone   : req.body.phone,
    dob     : new Date(req.body.dob),
    profession  : req.body.profession,
    country   : req.body.country
  });
  
  user.save(function (error, user) {
    if(error)
      res.send(error);
    else
      res.json({id: user._id});
  });
};

  // Get all Users at /api/users
exports.getUsers = function (req, res) {
  User.find(function (error, users) {
    if(error)
      res.send(error);
    else
      res.json(users);
  });
};

/***  Routes for /users/:user_id  ***/
//router.route('/users/:user_id')

// Get the user with the id user_id (at /api/users/:user_id)
exports.getUser = function (req, res) {
  User.findById(req.user._id, function (error, user) {
    if(error)
      res.send(error);
    else
      res.json(user);
  });
};

  // Update the user with the id user_id (at /api/users/:user_id)
exports.putUser = function (req, res) {
  User.findById(req.params.user_id, function (error, user) {
    if(error)
      res.send(error);

    user.username = req.body.username,
    user.password = req.body.password,
    user.email    = req.body.email,
    user.phone    = req.body.phone,
    user.dob    = req.body.dob,
    user.profession = req.body.profession,
    user.country  = req.body.country

    user.save(function (error) {
      if(error)
        res.send(error);
      else
        res.json({message: 'User Updated!'});
    });
  });
};

  // Delete the user with the id user_id (at /api/users/:user_id)
exports.deleteUser = function (req, res) {
    User.remove({
        _id: req.params.user_id
    }, function (error, user) {
        if (error)
            res.send(error);
        else
          res.json({ message: 'User deleted!' });
    });
};

exports.verifyUser = function (req, res) {
  if(req.user){
    res.json({ exists: req.user._id });
  }
  else{
    res.json({ exists: false});
  }
};

//module.exports = router;