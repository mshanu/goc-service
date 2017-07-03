const expect = require('chai').expect;
const sinon = require('sinon');
const challenge = require('./../../src/controller/challenge');
const Challenge = require('./../../src/models/challenge');
const UserChallenge = require('./../../src/models/userChallenge');
const User = require('./../../src/models/user');
let savedUser;
describe('challenge', () => {
  beforeEach((done) => {
    Promise.all([Challenge.remove({}),User.remove({}), UserChallenge.remove({})]).then(() =>
      Promise.all([
        new User({
          name:"user1",
          userId:"abcd1234",
          stage:1
        }).save(),
        new Challenge({
          stage: 0,
          statement: "Cound the number of items",
          instructions: "This is the instructions",
          sampleInput: {input:{name:"shanu"}},
          sampleOutput: {output: {name: "yahh"}},
          "inputOutputs":[{ 
            input:{items:[{name:"Samsung Galaxy", price:123.4}]},
            output: {count: 1} 
          }]
        }).save(),
        new Challenge({
          stage: 1,
          statement: "Which has the maximum price",
          instructions: "This is the instructions",
          sampleInput: {input:{name:"shanu"}},
          sampleOutput: {output: {name: "yahh"}},
          "inputOutputs":[{ 
            input:{items:[{name:"Samsung Galaxy", price:123.4},{name:"Samsung Galaxy", price:323.4}]},
            output: {name:"Samsung Galaxy", price:323.4}
          }]
        }).save()  
      ])).then((results)=>{
        savedUser = results[0];
        done();
      });
  }); 

  it('should return the challenge with stage of the player', (done) => {
    let sendSpy = sinon.spy();
    challenge.userChallenge({player:{stage:1}},{send:sendSpy});
    setTimeout(function () {
      expect(sendSpy.called).to.be.true 
      expect(sendSpy.getCall(0).args[0].statement).to.be.equal("Which has the maximum price")
      expect(sendSpy.getCall(0).args[0].sampleInput.input.name).to.be.equal("shanu")
      expect(sendSpy.getCall(0).args[0].sampleOutput.output.name).to.be.equal("yahh")
      expect(sendSpy.getCall(0).args[0].inputOutputs).to.be.undefined
      done();
    }, 100);
  });

  it('should return the input for the challenge for the player stage with an entry of user challenge', (done) => {
    let sendSpy = sinon.spy();
    challenge.challengeRequest({player:{stage:1}},{send:sendSpy});
    setTimeout(function () {
      expect(sendSpy.called).to.be.true
      expect(sendSpy.getCall(0).args[0]).to.deep.equal({items:[{name:"Samsung Galaxy", price:123.4},{name:"Samsung Galaxy", price:323.4}]})
      UserChallenge.find().then((records) => {
        expect(records).to.be.lengthOf(1);
        done();
      })
    }, 100);
  });

  it('should validate the output and increments users status if right', (done) => {
    let sendSpy = sinon.spy();
    challenge.validateOutput({emit:sinon.spy()})({player:savedUser,body:{output: {name:"Samsung Galaxy", price:323.4}}}, {send:sendSpy}); 
    setTimeout(function () {
      User.findByName("user1").then((user) => {
        expect(user.stage).to.be.equal(2)
        done();
      })
    },100);
  });

  it('should return 406 when the output to the challenge is wrong', (done) => {
    let sendSpy = sinon.spy(), statusStub = sinon.stub();
    statusStub.withArgs(406).returns({send: sendSpy});
    challenge.validateOutput({player:savedUser, body:{output:{name: "Samsung s3"}, price:323.4}},{status:statusStub});
    setTimeout(function () {
      User.findByName("user1").then(user => {
        expect(user.stage).to.be.equal(1);
        done();
      })
    }, 100);
  });



});

