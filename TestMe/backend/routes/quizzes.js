const express = require('express');

const router = express.Router();

const Quiz = require('../models/quiz');
const QuizTake = require('../models/quizTake');
const User = require('../models/user');
const checkAuth = require('../middleware/check-auth');


router.get('/list', checkAuth, (req, res, next) => {
  const userId = req.headers.authorization.split(' ')[2];
  Quiz.find({userId: userId}).then((quizzesFound) => {
    res.status(200).json({
      quizzes: quizzesFound
    })
  }).catch(err => {res.status(501).json({message: 'A server error occurred, please try again later'})});
});

router.get('/list/:id', (req, res, next) => {
  Quiz.findById(req.params.id).then((foundQuiz) => {
    res.status(200).json({foundQuiz: foundQuiz})
  }).catch(err => {res.status(501).json({message: 'A server error occurred, please try again later'})})
});

router.delete('/list/:id', checkAuth, (req, res, next) => {
  const quizId = req.params.id;
  Quiz.findByIdAndDelete({_id: quizId}).then(() => {
    res.status(200).json({
      message: 'Deleted succesfully'
    });
  }).catch(err => {res.status(501).json({message: 'A server error occurred, please try again later'})});
});

router.post('/create', checkAuth , (req, res, next) => {
  const quiz = new Quiz({userId: req.body.userId, userEmail: req.body.userEmail, quizTitle: req.body.quizTitle, questions: req.body.questions, quizCode: req.body.quizCode});
  quiz.save().then(() => {
    res.status(201).json({message: 'Successfully added quiz', _id: quiz._id});
  }).catch(err => {res.status(501).json({message: 'A server error occurred, please try again later'})})
});

router.put('/create/:id', checkAuth, (req, res, next) => {
  const quiz = new Quiz({
    _id: req.body.id,
    quizTitle: req.body.quizTitle,
    questions: req.body.questions,
    quizCode: req.body.quizCode
  });
  Quiz.updateOne({_id: quiz._id}, quiz).then(() => {
    res.status(200).json({message: "Edit succesful!"});
  }).catch(err => {res.status(501).json({message: 'A server error occurred, please try again later'})});
});


router.post('/quizCode', checkAuth, (req, res, next) => {
  Quiz.findOne({quizCode: req.body.quizCode}).then((foundQuiz) => {
    if(foundQuiz !== null){
      res.status(200).json({
        quiz: foundQuiz
      });
    } else {
      res.status(401).json({message: 'No test found with entered test code, please try a different code'})
    }
  }).catch(err => console.log(err));
});

router.post('/result', checkAuth, (req, res, next) => {
  const quizTake = new QuizTake({
    userId: req.body.userId,
    quizTitle: req.body.quizTitle,
    result: req.body.result,
    questionsNr: req.body.questionsNr,
    creator: req.body.creator
  });
  quizTake.save().then(() => {
    res.status(200).json({message: "Submit succesful"});
  }).catch(err => {res.status(501).json({message: 'A server error occurred, please try again later'})})
});

router.get('/resultsTeacher', checkAuth, (req, res, next) => {
  const userId = req.headers.authorization.split(' ')[3];
  QuizTake.find({creator: userId}).then(foundQuizzes => {
    res.status(200).json({
      results: foundQuizzes,
    });
  }).catch(err => {res.status(501).json({message: 'A server error occurred, please try again later'})})
});

router.get('/resultsStudent', checkAuth, (req, res, next) => {
  const userId = req.headers.authorization.split(' ')[3];
  QuizTake.find({userId: userId}).then(foundQuizzes => {
    res.status(200).json({
      results: foundQuizzes
    });
  }).catch(err => {res.status(501).json({message: 'A server error occurred, please try again later'})});
});


module.exports = router;

