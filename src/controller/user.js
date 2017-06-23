const User = require('./../models/user')
const randomstring = require('randomstring');

const create = function(req,res) {
  let username = req.body.name
  if(!username) return res.status(500).send('Bad request');
  User.findByName(username)
    .then(user => {
      if(user){
        res.status(412).send('User already exists');
      }else {
        let user = new User({name:username, userId:randomstring.generate(10), stage:0})
        user.save((err,savedUser) => {
          err ? res.sendStatus(500) : res.send(savedUser)
        });
      }
    })
}


const validateAndPass = function(req,res,next){
  User.findByUserId(req.get('userId'))
    .then((user) => {
      if(user) {
        req.player = user;
        return next();
      }
      return res.status(401).send('Not a valid user');
    });
}
const list = function(io) {
  return User.find().then((users) => io.emit('user update',users));
}
module.exports = {
  create: create,
  validateAndPass: validateAndPass,
  list: list
}
