# zoom-oauth-sample-app

> This is a sample app that uses oauth to call Zoom's API. It uses the request node module to make http calls. 

## Getting Started

### Install

Clone the repo using git clone.
` git clone https://github.com/zoom/zoom-oath-sample-app.git`

> Install the dependent node modules.
``` npm install ```

### Quick Start



> In the config.js file, input your clientID, clientSecret, and redirectUrl. 
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

### For more Information about Zooms API and JWT
Documentation is available on the [Zoom Oauth docs site](https://marketplace.zoom.us/docs/oauth-with-zoom)
