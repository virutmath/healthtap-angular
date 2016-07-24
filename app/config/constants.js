const BASE_API_URL = 'http://healthcall.gosutv.net';
const API_OAUTH = '/oauth/access_token';
const API_USER_INFO = '/users/info';
const CLIENT_ID = 'health';
const CLIENT_SECRET = '3erfsd5ghgfssfg';

const API = {
	URL: {
		token: () => {
			return BASE_API_URL + API_OAUTH;
		},
		user_info: () => {
			return BASE_API_URL + API_USER_INFO
		}
	}
};

const ERROR_NAME = {
	TOKEN_EXPIRED : 'TOKEN_EXPIRED'
};
