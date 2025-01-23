const https = require('https');
const { URL, URLSearchParams } = require('url');

const http = require('http');

// Create an HTTP server
const server = http.createServer((req, res) => {
    const requestURL = new URL(req.url, `http://${req.headers.host}`);

    // Function to handle HTTPS requests
    function makeHttpsRequest(options, body, callback) {
        const request = https.request(options, response => {
            let data = '';
            response.on('data', chunk => data += chunk);
            response.on('end', () => callback(null, JSON.parse(data)));
        });
        request.on('error', error => callback(error, null));
        if (body) {
            request.write(body);
        }
        request.end();
    }

    if (requestURL.pathname === '/' && requestURL.searchParams.has('code')) {
        const code = requestURL.searchParams.get('code');

        // Prepare URLSearchParams for the token request body
        const params = new URLSearchParams();
        params.append('grant_type', 'authorization_code');
        params.append('code', code);
        params.append('redirect_uri', process.env.REDIRECT_URL);

        const tokenOptions = {
            hostname: 'zoom.us',
            path: '/oauth/token',
            method: 'POST',
            headers: {
                'Authorization': `Basic ${Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString('base64')}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        // Request for access token using URLSearchParams.toString()
        makeHttpsRequest(tokenOptions, params.toString(), (err, tokenBody) => {
            if (err || !tokenBody.access_token) {
                console.error('Token request failed:', err || tokenBody);
                return;
            }

            // Use the access token to make a user info request
            const userInfoOptions = {
                hostname: 'api.zoom.us',
                path: '/v2/users/me',
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${tokenBody.access_token}`
                }
            };

            makeHttpsRequest(userInfoOptions, null, (err, userBody) => {
                if (err) {
                    console.error('Failed to get user data:', err);
                    return;
                }
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(`<html><body><pre>${JSON.stringify(userBody, null, 2)}</pre></body></html>`);
            });
        });

    } else {
        // Redirect to Zoom OAuth to authorize
        const authURL = new URL('https://zoom.us/oauth/authorize');
        authURL.searchParams.set('response_type', 'code');
        authURL.searchParams.set('client_id', process.env.CLIENT_ID);
        authURL.searchParams.set('redirect_uri', process.env.REDIRECT_URL);

        res.writeHead(302, { Location: authURL.toString() });
        res.end();
    }
});

server.listen(4000, () => {
    console.log('Server listening on port 4000');
});
