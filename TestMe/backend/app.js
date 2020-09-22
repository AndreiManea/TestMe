
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const quizzesRoutes = require ('./routes/quizzes');
const authRoutes = require('./routes/auth');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect("mongodb://localhost/TestMe", {useNewUrlParser: true, useUnifiedTopology: true})
  .then(()=>{
    console.log("Connection succesful!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});
app.use('/api',quizzesRoutes);
app.use('/api/auth',authRoutes);
module.exports = app;
