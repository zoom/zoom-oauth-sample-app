const express = require('express')
const app = express()
const config = require('./config');
const request = require('request');
var resp;

app.get('/', (req, res) => {

    //this will check if the code parameter is in the url, if not the most likely case is that this is the user's inital visit to oauth and we need to redirect them (Step 1)
    //if there is a code, it most likely means they were redirected here from zoom oauth screen
    if (req.query.code) {

        let url = 'https://zoom.us/oauth/token?grant_type=authorization_code&code=' + req.query.code + '&redirect_uri=' + config.redirectUrl;

        //STEP 3
        //we need to exchange the code for a oauth token
        request.post(url, function (error, response, body) {

            //the response should be a JSON payload
            body = JSON.parse(body);
            //html for displaying response in the browser
            var title1 ='<center><h3>Your access token: </h3></center>' 
            var title2 ='<center><h3>Your refresh token: </h3></center>' 
            var result1 = title1 + '<code><pre style="background-color:#aef8f9;">' + body.access_token + '</pre></code>';
            var result2 = title2 + '<code><pre style="background-color:#aef8f9;">' + body.refresh_token + '</pre></code>';

            var title ='<center><h3>User\'s information:</h3></center>' 
        //Prettify the JSON format using pre tag and JSON.stringify
            
            //print access_token in the browser
            //res.send(body.access_token); 
            console.log(body.access_token);
            
            //get refresh token
            let refresh_token = body.refresh_token

            if (body.access_token) {

                //STEP 4
                //we can now use the access token to make API calls
                request.get('https://api.zoom.us/v2/users/me', function (error, response, body) {
                    if(error){
                        console.log('Error in API ', error)
                    }else{
                        body = JSON.parse(body);
                        //display response in console
                        console.log('API call ', body);
                        //display response in browser
                        var result = title + '<code><pre style="background-color:#aef8f9;">'+JSON.stringify(body, null, 2)+ '</pre></code>'
                        res.send(result1 + '<br>' + result2 + '<br>' +  result);
 
                    }

                }).auth(null, null, true, body.access_token);
            
            } else {
                //handle error, something went wrong
            }

        }).auth(config.clientID, config.clientSecret);

        return;
    }

    //STEP 2
    //no code provided, so redirect the user to get the code
    res.redirect('https://zoom.us/oauth/authorize?response_type=code&client_id=' + config.clientID + '&redirect_uri=' + config.redirectUrl);
});

app.listen(3000, () => console.log('Zoom api oauth sample app listening on port 3000!'))
 