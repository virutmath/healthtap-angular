const BASE_API_URL = 'http://healthcall.gosutv.net';
const API_OAUTH = '/oauth/access_token';
const API_USER_INFO = '/users/info';
const API_USER = '/users';
const API_SPECIALIZATION = '/specialization';
const API_QUESTION = '/questions';
const API_TOPIC = '/topics';

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
			return BASE_API_URL + API_USER
		},
		user_register: ()=> {
			return BASE_API_URL + API_USER
		},
		user_detail: (id)=> {
			return BASE_API_URL + API_USER + '/' + id;
		},
		specialization: (id = '')=>{
			if(id) {
				return BASE_API_URL + API_SPECIALIZATION + '/' + id;
			}else{
				return BASE_API_URL + API_SPECIALIZATION;
			}
		},
		question: (id = '') => {
			if(id) {
				return BASE_API_URL + API_QUESTION + '/' + id;
			}else{
				return BASE_API_URL + API_QUESTION;
			}
		},
		topic: (id = '') => {
			if(id) {
				return BASE_API_URL + API_TOPIC + '/' + id;
			}else{
				return BASE_API_URL + API_TOPIC;
			}
		}
	}
};

const ERROR_NAME = {
	TOKEN_EXPIRED : 'AccessDenied'
};

const SIDEBAR_MENU = [
	{
		'name': 'Quản lý người dùng',
		'child' : [
			{
				'name' : 'Danh sách',
				'route' : 'dashboard.user'
			}
		]
	},
	{
		'name': 'Quản lý nội dung',
		'child': [
			{
				'name':'Quản lý câu hỏi',
				'route':'dashboard.question'
			},
			{
				'name':'Quản lý chuyên khoa',
				'route':'dashboard.specialization'
			},
			{
				'name':'Quản lý chủ đề',
				'route':'dashboard.topic'
			},
			{
				'name':'Quản lý danh hiệu',
				'route':'dashboard'
			},
		]
	},
	{
		'name': 'Khiếu nại',
		'child': [
			{
				'name': 'Danh sách khiếu nại',
				'route':'dashboard'
			}
		]
	},
	{
		'name': 'Thống kê',
		'child':[

		]
	}
];
