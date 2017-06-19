const expect = require('chai').expect;
const Challenge = require('./../../src/models/challenge');
const User = require('./../../src/models/user');
const UserChallenge = require('./../../src/models/userChallenge');
describe('user challenge model', () => {
  beforeEach((done) => {
    Promise.all([User.remove({}),
      Challenge.remove({}),
      UserChallenge.remove({})
    ]).then(()=>
      Promise.all([
        new User({
          name:"user1",
          userId:"abcd1234",
          stage:0
        }).save(),
        new Challenge({
          stage:0,
          statement: "Statement",
          sampleInput: "sample input",
          inputOutputs: [{input: "input", output:"output"}]
        }).save()
      ])
    ).then((userChallenge)=> new UserChallenge({
        _user: userChallenge[0]._id,
        _challenge: userChallenge[1]._id,
        inputRequestTime: new Date(),
        attemptedTime: new Date(),
        output: {"product": "Samsung", "price": 123.4}
      }).save()).then(() => done());   
  });
  it('should save user challenge', (done) => {
    UserChallenge.find().populate('_user').populate('_challenge').exec().then(userChallenges => {
      expect(userChallenges).to.be.lengthOf(1);
      expect(userChallenges[0]._user.name).to.be.equal("user1");
      done();
    })
  }); 
});
