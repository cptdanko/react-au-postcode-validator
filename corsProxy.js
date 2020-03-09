var express = require("express");
var http = require("http");
var app = express();
var appServer = require("request");

var incomingRequest = require("request");
/*taken from here
https://github.com/ccoenraets/cors-proxy/blob/master/server.js
and here
https://github.com/jonathansee2013/Postcode-Validator
*/
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

app.listen(9999, '0.0.0.0');
console.log("Listening on 0.0.0.0: 9999");

app.get('/api', function(req, res) {
    //console.log(req);
    var config = {
        url: 'https://digitalapi.auspost.com.au/postcode/search.json?q=' + req.query.q + '&state='+ req.query.state,
        method: 'GET',
        headers: {
            "AUTH-KEY": "872608e3-4530-4c6a-a369-052accb03ca8"
        }
    }

    var newRequest = incomingRequest(config);
    req.pipe(newRequest)
    .on('response', function(response) {
        delete response.headers['access-control-allow-origin']
    })
    .pipe(res);
});