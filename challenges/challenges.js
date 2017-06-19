const mongoose = require('./../src/models/mongoose');
const Challenge = require('./../src/models/challenge');
const fs = require('fs');

new Challenge(JSON.parse(fs.readFileSync("/Users/shanu/Projects/goc/service/challenges/0.json"))).save().then((err,resp) => console.log(err) );


