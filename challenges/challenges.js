const mongoose = require('./../src/models/mongoose');
const Challenge = require('./../src/models/challenge');
const fs = require('fs');

Promise.all([
  new Challenge(JSON.parse(fs.readFileSync("/Users/shanu/Projects/goc/service/challenges/0.json"))).save(),
  new Challenge(JSON.parse(fs.readFileSync("/Users/shanu/Projects/goc/service/challenges/1.json"))).save(),
  new Challenge(JSON.parse(fs.readFileSync("/Users/shanu/Projects/goc/service/challenges/2.json"))).save(),
  new Challenge(JSON.parse(fs.readFileSync("/Users/shanu/Projects/goc/service/challenges/3.json"))).save()
]).then(() => console.log("Finished "+arguments));
