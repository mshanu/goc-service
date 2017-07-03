const User = require('./../models/user')
const user = require('./../controller/user')
const Challenge = require('./../models/challenge')
const UserChallenge = require('./../models/userChallenge')
const deepEqual = require('deep-equal');
const create = function(req,res) {
  new Challenge(req.body).save((err,savedChallenge) => err ? res.status(500).send(err): 
    res.send(savedChallenge));
}

const userChallenge = function(req,res) {
  if(!req.player) return res.status(500).send('Invalid Request');
  Challenge.findByStage(req.player.stage)
    .then(challenge => {
      if(!challenge) return res.status(500).send('to your face');
      res.send(challenge);
    })
}
const challengeRequest = function(req,res) {
  if(!req.player) return res.status(500).send('Invalid Request');
  Challenge.findByStageWithInputOutput(req.player.stage)
    .then(challenge => {
      if(!challenge) return res.status(500).send('to your face');
      new UserChallenge({_user:req.player._id, _challenge: challenge._id,inputRequestTime:new Date()}).save().
        then(() => res.send(challenge.inputOutputs[0].input))
    });
}

const validateOutput=function(io){
  return (req,res) => {
    if(!req.player) return res.status(500).send('Invalid Request');
    Challenge.findByStageWithInputOutput(req.player.stage)
      .then(challenge => {
        if(!challenge) return res.status(500).send('to your face');
        if(deepEqual(req.body.output,challenge.inputOutputs[0].output)){
          req.player.stage++;
          req.player.save().then((player) => user.list(io)).
            then(res.send('The answer is right! You can proceed to the next challenge'))
        }
        else{
          res.status(406).send('Wrong answer!!');
        }
      })

  }
}



module.exports = {
  create:create,
  userChallenge:userChallenge,
  challengeRequest:challengeRequest,
  validateOutput: validateOutput
}
