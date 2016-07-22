const BASE_API_URL = 'http://healthcall.gosutv.net';
const OAUTH = '/oauth/access_token';
const CLIENT_ID = 'health';
const CLIENT_SECRET = '3erfsd5ghgfssfg';

const API = {
	URL: {
		token: () => {
			return BASE_API_URL + OAUTH;
		}
	}
};

const ERROR_NAME = {
	TOKEN_EXPIRED : 'TOKEN_EXPIRED'
};
