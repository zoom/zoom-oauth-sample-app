# zoom-oauth-sample-app

> This is a sample app that uses oauth to call Zoom's API. It uses the request node module to make http calls. 

## Getting Started

### Install

Clone the repo using git clone.
` git clone https://github.com/zoom/zoom-oath-sample-app.git`

> Install the dependent node modules.
``` npm install ```

### Quick Start



> In the config.js file, input your clientID, clientSecret, and redirectUrl. Please note to test locally the redirectUrl can't be localhost, you can use ngrok or a similar service instead. 
``` 
   const config = {
	development :{
		clientID : '',
		clientSecret : '',
		redirectUrl : ''
	},
	production:{	
		clientID : '',
		clientSecret : '',
		redirectUrl: ''
	}
}; 
```
> Set your environment varaibles.
` export NODE_NEV=[environment name] (e.g. export NODE_NEV=production) `

> Start the node app.
` node.index.js `

> Go to localhost:3000 in the browser


### For more Information about Zooms API and OAuth
Documentation is available on the [Zoom Oauth docs site](https://marketplace.zoom.us/docs/guides/authorization/oauth)

## Support
For any questions or issues, please visit our new Community Support Forum at https://devforum.zoom.us/
