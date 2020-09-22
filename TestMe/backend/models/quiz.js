const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  userId: {type: String},
  userEmail: {type: String},
  quizTitle: {type: String},
  questions: {
    type: [
      {
        id: String,
        questionTitle: String,
        answers: [
          {
            id: String,
            answerTitle: String
            , correct: String, _id: false
          }]
      }], required: true, _id: false
  },
  quizCode: {type: String}
});

module.exports = mongoose.model('Quiz', quizSchema);
