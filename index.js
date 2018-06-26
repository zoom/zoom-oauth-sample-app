const jwt = require('jsonwebtoken');
const config = require('./config');
const rp = require('request-promise');

const payload = {
    iss: config.APIKey,
    exp: ((new Date()).getTime() + 5000)
};

//Automatically creates header, and returns JWT
const token = jwt.sign(payload, config.APISecret);


var options = {
    uri: 'https://api.zoom.us/v2/users', //Zoom API
    qs: {
        status: 'active' // -> uri + '?status=active'
    },
    auth: {
    		'bearer': token
  	},
    headers: {
        'User-Agent': 'Zoom-api-Jwt-Request',
        'content-type': 'application/json'
    },
    json: true // Automatically parses the JSON string in the response
};

//using request call with promise
rp(options)
    .then(function (response) {
        console.log('User has', response);
    })
    .catch(function (err) {
        // API call failed...
        console.log('API call failed, reason ', err);
    });