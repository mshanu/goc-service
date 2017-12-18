HOST =10.134.20.141

To register post a request with json {"name":"team name"} to http://host:3000/user/register
The response contains the userId

curl -X POST -d '{"name":"shanu"}' -H "Content-Type:application/json" http://host:3000/user/register

All the below request should have below headers
"Content-Type:application/json"
"userId:registeredUserId"

You can get the challange  http://host:3000/challenge
You GET the input from http://host:3000/challenge/input
and the output should be POST to http://host:3000/challenge/output

db.users.update({_id:ObjectId("59635376df071421481bcf56")},{$set:{"stage":0}})

db.users.updateMany({},{$set:{"stage":0}})
