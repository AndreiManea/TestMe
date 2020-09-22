const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {type: String, unique: true},
  password: String,
  userType: {type: String, required: true}
});

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', userSchema);
