const express = require('express')
const app = express()
const config = require('./config');
const request = require('request');

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
                        console.log('API call ', body);
                        //do something with the data
                        //this is most likely where you want to connect the zoom user to the calendly user, there will be a zoom user id
                        //add where you'll want to store the access token for future requests
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
 