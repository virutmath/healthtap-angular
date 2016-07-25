const BASE_API_URL = 'http://healthcall.gosutv.net';
const API_OAUTH = '/oauth/access_token';
const API_USER_INFO = '/users/info';
const API_USER_LIST = '/users';
const API_USER_REGISTER = '/users';
const API_USER_DETAIL = '/users';
const CLIENT_ID = 'health';
const CLIENT_SECRET = '3erfsd5ghgfssfg';
const AVATAR_DEFAULT = '/assets/img/avatar.png';
const API = {
	URL: {
		token: () => {
			return BASE_API_URL + API_OAUTH;
		},
		user_info: () => {
			return BASE_API_URL + API_USER_INFO
		},
		user_list: () => {
			return BASE_API_URL + API_USER_LIST
		},
		user_register: ()=> {
			return BASE_API_URL + API_USER_REGISTER
		},
		user_detail: (id)=> {
			return BASE_API_URL + API_USER_DETAIL + '/' + id;
		}
	}
};

const ERROR_NAME = {
	TOKEN_EXPIRED : 'AccessDenied'
};

const SIDEBAR_MENU = [
	{
		'name': 'User management',
		'child' : [
			{
				'name' : 'List user',
				'route' : 'dashboard.user'
			}
		]
	},
	{
		'name' : 'Category management',
		'child': [
			{
				'name': 'List category',
				'route': 'dashboard.category'
			}
		]
	}
];
