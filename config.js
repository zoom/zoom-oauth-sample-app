const env = process.env.NODE_ENV || 'production'

//insert your API Key & Secret for each environment, keep this file local and never push it to repo.
const config = {
	development :{
		clientID : '***REMOVED***',
		clientSecret : '***REMOVED***',
		redirectUrl : '***REMOVED***'
	},
	production:{	
		clientID : '***REMOVED***',
		clientSecret : '***REMOVED***',
		redirectUrl: '***REMOVED***'
	}
};

module.exports = config[env]
