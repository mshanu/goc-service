const mongoose = require('./../../src/models/mongoose');
const Challenge = require('./../../src/models/challenge');
const fs = require('fs');

Challenge.remove({}).then(
    Promise.all([
        new Challenge(JSON.parse(fs.readFileSync("/Users/shanu/Projects/goc/service/challenges/august/0.json"))).save(),
        new Challenge(JSON.parse(fs.readFileSync("/Users/shanu/Projects/goc/service/challenges/august/1.json"))).save(),
        new Challenge(JSON.parse(fs.readFileSync("/Users/shanu/Projects/goc/service/challenges/august/2.json"))).save(),
        new Challenge(JSON.parse(fs.readFileSync("/Users/shanu/Projects/goc/service/challenges/august/3.json"))).save(),
        new Challenge(JSON.parse(fs.readFileSync("/Users/shanu/Projects/goc/service/challenges/august/4.json"))).save()
    ])).then(() => console.log("Finished " + arguments));
