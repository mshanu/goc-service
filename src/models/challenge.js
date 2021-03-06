const mongoose = require('./mongoose');

let challengeSchema = new mongoose.Schema({
  "stage": {type: Number, unique: true, required:true, dropDups:true},
  "statement": String,
  "instructions": String,
  "sampleInput": {},
  "sampleOutput": {},
  "inputOutputs": []
});
challengeSchema.statics.findByStage = function(stage,cb) {
 return this.findOne({stage:stage},cb).select('stage statement instructions sampleInput sampleOutput');
}
challengeSchema.statics.findByStageWithInputOutput = function(stage,cb) {
  return this.findOne({stage:stage},cb);
}
const Challenge = mongoose.model('Challenge',challengeSchema);
module.exports = Challenge

