htAdmin.service('tokenControlService', function ($cookies) {
	let tokenData = $cookies.get('token') ? JSON.parse($cookies.get('token')) : null;
	let time = Date.now();

	/**
	 * Set token to cookie
	 * @param token_data
	 */
	this.setToken = (token_data) => {
		let token = {
			token: token_data.access_token,
			expired_time: token_data.expires_in + time,
			refresh_token: token_data.refresh_token,
			type: token_data.token_type
		};
		$cookies.put('token',JSON.stringify(token));
	};

	/**
	 * Get token string
	 * @returns {*}
	 */
	this.getTokenValue = () => {
		if (tokenData) return tokenData.token;
		return null;
	};

	/**
	 * Get expired time of current token
	 * @returns {*}
	 */
	this.getTokenExpiredTime = () => {
		if (tokenData) return tokenData.expired_time;
		return null;
	};

	/**
	 * Get refresh token string
	 * @returns {*}
	 */
	this.getTokenRefresh = () => {
		if (tokenData) return tokenData.refresh_token;
		return null;
	};

	/**
	 * Get authorization token string
	 * @returns {*}
	 */
	this.getAuthorizationToken = () => {
		if(tokenData) return tokenData.type + ' ' + tokenData.token;
		return null;
	}
});
