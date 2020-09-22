const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.post('/register', (req, res, next) => {
  User.findOne({email: req.body.email, userType: req.body.userType}).then(foundUser => {
    if(foundUser !== null){
      res.status(403).json({
        message: 'User already exists with the specified e-mail address and user type'
      })
    }else{
      bcrypt.hash(req.body.password, 10).then(hPass => {
        const user = new User({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: hPass,
          userType: req.body.userType
        });
        user.save().then(() => {
          res.status(200).json({
            message: 'User Registered'
          });
        }).catch(err => {res.status(501).json({message: 'A server error occurred, please try again later'})})
      });
    }
  });
});

router.post('/login', (req, res, next) => {
  User.findOne({email: req.body.email}).then(foundUser => {
      if(foundUser !== null){
        bcrypt.compare(req.body.password, foundUser.password).then((result) => {
          if(result){
            const token = jwt.sign({
              id: foundUser._id,
              displayName: foundUser.displayName,
              email: foundUser.email,
              userType: foundUser.userType
            }, "secretString");
            res.status(200).json({
              token: token,
              userType: foundUser.userType,
              _id: foundUser._id,
              userEmail: foundUser.email,
              userName: foundUser.firstName + ' ' + foundUser.lastName
            });
          }else{
            res.status(401).json({message: "Wrong password, please try again."})
          }
        }).catch(err => {res.status(501).json({message: 'A server error occurred, please try again later'})})
      } else{
        res.status(401).json({message: "No user found with this e-mail address, please try again."})
      }

  }).catch(err => {res.status(501).json({message: 'A server error occurred, please try again later'})})
});

module.exports = router;
