const expect = require('chai').expect;
const sinon = require('sinon');
const User  = require('./../../src/models/user');
const user = require('./../../src/controller/user')

let statusStub = sinon.stub(),sendSpy= sinon.spy(),req = {body:{"name":"user1"}};
describe('user', () => {
  beforeEach((done) => {
    User.remove({}).then(() => {
      new User({
        name: "user1",
        userId: "abcd1234",
        stage: 2
      }).save(done) 
    });
  });

  it('should return 412 if user alrady exists with the same name', (done) => {
    statusStub.withArgs(412).returns({send: sendSpy});
    user.create(req,{status:statusStub});
    setTimeout(function () {
      expect(statusStub.called).to.be.true
      expect(sendSpy.called).to.be.true
      done()
    }, 100);
  }); 

  it('should create user if user does not exists', (done) => {
    user.create({body:{name:"new_user"}},{send:sendSpy})
    setTimeout(function () {
      User.find((err,records) => {
        expect(records).to.have.lengthOf(2);
        expect(records[1].name).to.equal("new_user");
        expect(sendSpy.called).to.be.true
        done()
      });
    }, 100);
  });

});
