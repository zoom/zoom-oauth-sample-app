const env = process.env.NODE_ENV || 'production'

//insert your API Key & Secret for each environment, keep this file local and never push it to repo.
const config = {
	development :{
		clientID : 'owl34V64TVrX2gYAKBUvQ',
		clientSecret : '4YZ2XLTfQMmt6J1htGB33T5PMEy2XwBT',
		redirectUrl : 'https://080b95ee.ngrok.io'
	},
	production:{	
		clientID : '7W1DsbORUSYvRB1M9C0Q',
		clientSecret : 'YkPqAqaVRWZwrPbCgIvUEyZQbe9UO6jp',
		redirectUrl: 'https://080b95ee.ngrok.io'
	}
};

module.exports = config[env]
