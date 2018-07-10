const env = process.env.NODE_ENV || 'development'

//insert your API Key & Secret for each environment, keep this file local and never push it to repo.
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

module.exports = config[env]
