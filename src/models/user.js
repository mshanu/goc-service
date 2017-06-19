const mongoose = require('./mongoose');
const randomstring = require('randomstring');
let userSchema = new mongoose.Schema({
  name: String,
  userId: String,
  stage: Number 
});
userSchema.statics.findByUserId = function(userId,cb) {
return  this.findOne({userId:userId},cb);
} 
userSchema.statics.findByName = function(name,cb){
 return this.findOne({name:name},cb)
}
const User =  mongoose.model('User',userSchema)
 

module.exports = User



