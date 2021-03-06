const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http,{path:'/napi'});
const randomstring = require('randomstring')
const bodyParser = require('body-parser')
const user = require('./controller/user')
const challenge = require('./controller/challenge')
const preconditions  = require('./mw/preconditions');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req,res,next) => {
  if(req.url === '/napi'){
    return next()
  }
  if(req.url === '/user/register'){
    return next();
  }
  user.validateAndPass(req,res,next);
});
app.post('/user/register',preconditions.userRegistration, user.create(io));
app.post('/challenge', challenge.create);

app.get('/challenge', challenge.userChallenge);
app.get('/challenge/input', challenge.challengeRequest);
app.post('/challenge/output',preconditions.userAttemptTimeValidation, challenge.validateOutput(io));
//app.post('/challenge/:challengeId/attempt', user.challengeAttempt);
app.get('/ping', (req,res) => res.send({ping:'pong'}));

io.on('connection', (socket) => user.list(io))

http.listen(3000,() => console.log("Server listening"));
