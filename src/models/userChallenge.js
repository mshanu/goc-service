const mongoose = require('./mongoose');
let userChallengeSchema = new mongoose.Schema({
  _user: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
  _challenge: {type: mongoose.Schema.Types.ObjectId, ref:'Challenge'},
  inputRequestTime: Date,
  attemptedTime: Date,
  output: {} 
});

module.exports = mongoose.model('UserChallenge', userChallengeSchema);
