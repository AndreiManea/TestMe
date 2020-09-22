const mongoose = require('mongoose');

const quizTakeSchema = new mongoose.Schema({
  userId: {type: String},
  quizTitle: {type: String},
  creator: {type: String},
  result: {type: Number},
  questionsNr: {type: Number},
});

module.exports = mongoose.model('QuizTake', quizTakeSchema);
