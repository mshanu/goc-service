const User = require('./../../src/models/user');
userWithNamePromise = (name)  => new User({name:name, userId: name, stage:0}).save()
clear = () => User.remove({})
module.exports ={
  userWithNamePromise: userWithNamePromise,
  clear:clear
}
