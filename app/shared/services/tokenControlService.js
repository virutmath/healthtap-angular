htAdmin.service('tokenControlService', function ($cookies) {
	let tokenData = $cookies.get('token') ? JSON.parse() : null;
	let time = Date.now();
	this.setToken = (token_data) => {
		let token = {
			token: token_data.access_token,
			expired_time: token_data.expires_in + time,
			refresh_token: token_data.refresh_token,
			type: token_data.token_type
		};
		$cookies.put('token',JSON.stringify(token));
	};

	this.getTokenValue = () => {
		if (tokenData) return tokenData.token;
		return null;
	};

	this.getTokenExpiredTime = () => {
		if (tokenData) return tokenData.expired_time;
		return null;
	};

	this.getTokenRefresh = () => {
		if (tokenData) return tokenData.refresh_token;
		return null;
	};

	this.getAuthorizationToken = () => {
		if(tokenData) return tokenData.type + ' ' + tokenData.token;
		return null;
	}
});
