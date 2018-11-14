'use strict';

var fs = require('fs');
var path = require('path');
var https = require('https');

const data = JSON.stringify({
	"TechPref":"Serverless"
})

const options = {
  hostname: 't6zzpojhqj.execute-api.eu-central-1.amazonaws.com',
  port: 443,
  path: '/prod/items/EDAF9D4C-25ED-4DBF-BF3D-EC6B1B7D8FF3',
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
}

const req = https.request(options, (res) => {
  console.log(`statusCode: ${res.statusCode}`)

  res.on('data', (d) => {
    process.stdout.write(d)
  })
})

req.on('error', (error) => {
  console.error(error)
})

req.write(data)
req.end()

exports.get = function(event, context, callback) {
  var contents = fs.readFileSync(`public${path.sep}index.html`);
  var result = {
    statusCode: 200,
    body: contents.toString(),
    headers: {'content-type': 'text/html'}
  };

  callback(null, result);
};
