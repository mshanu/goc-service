HOST =10.134.22.189

To register post a request with json {"name":"team name"} to http://host:3000/user/register
The response contains the userId

curl -X POST -d '{"name":"shanu"}' -H "Content-Type:application/json" http://10.134.22.189:3000/user/register

All the below request should have below headers
"Content-Type:application/json"
"userId:registeredUserId"

You can get the challange  http://10.134.22.189:3000/challenge
You GET the input from http://host:3000/challenge/input
and the output should be POST to http://10.134.22.189:3000/challenge/output
