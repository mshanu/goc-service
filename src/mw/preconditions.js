const UserChallenge = require('./../models/userChallenge');
const User = require('./../models/user');
let userPresence = (req,res,next) => {
  if(!req.player) return res.status(500).send('Invalid Request');
  return next();
}
let userRegistration = (req,res,next) => {
  return User.count({}).then(count => count > 9 ? res.status(416).send('Maximum number of users registered'):  next());
}
let userAttemptTimeValidation = (req,res,next) => {
  let player = req.player;
  UserChallenge.find({_user:player._id}).populate('_challenge').then(challenges => {
    if(challenges.length ===  0) return res.status(416).send("User cannot post output without input")
    let latestChallenge = challenges.sort((a,b) => b.inputRequestTime - a.inputRequestTime)[0];
    if(new Date() - latestChallenge.inputRequestTime > 2000){
      return res.status(416).send("Timeout, the response need to come back in less than 2 seconds");
    }
    latestChallenge.attemptedTime = new Date()
    latestChallenge.output  = req.body.output
    latestChallenge.save().then(() => next());
  });
}
module.exports = {
  userPresence: userPresence,
  userAttemptTimeValidation: userAttemptTimeValidation,
  userRegistration: userRegistration
}
