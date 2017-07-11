const mongoose = require('./../src/models/mongoose');
const Challenge = require('./../src/models/challenge');
const fs = require('fs');

Challenge.remove({}).then(
    Promise.all([
        new Challenge(JSON.parse(fs.readFileSync("/Users/shanu/Projects/goc/service/challenges/sample.json"))).save()
    ])).then(() => console.log("Finished " + arguments));
