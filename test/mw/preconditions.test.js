const preconditions = require('./../../src/mw/preconditions');
const userFactory = require('../factory/user')
const sinon = require('sinon')
const expect = require('chai').expect;
describe('Precondition Middleware', () => {

  beforeEach((done) => {
    userFactory.clear().then(()=> done());
  })

  it('should return 416 if user registration exceeds 8', (done) => {
  let statusStub = sinon.stub(),sendSpy= sinon.spy(),req = {body:{"name":"user1"}}, nextSpy = sinon.spy();
    statusStub.withArgs(416).returns({send: sendSpy});
    Promise.all([
      userFactory.userWithNamePromise('a'),
      userFactory.userWithNamePromise('b'),
      userFactory.userWithNamePromise('c'),
      userFactory.userWithNamePromise('d'),
      userFactory.userWithNamePromise('e'),
      userFactory.userWithNamePromise('f'),
      userFactory.userWithNamePromise('g'),
      userFactory.userWithNamePromise('h')
    ]).then(() => {
      preconditions.userRegistration({}, {status:statusStub},nextSpy) 
      setTimeout(function () {
        expect(nextSpy.called).to.be.false
        expect(statusStub.called).to.be.true
        done()
      }, 100);
    }).catch(reasons => console.log(reasons)) 
  }); 
});
