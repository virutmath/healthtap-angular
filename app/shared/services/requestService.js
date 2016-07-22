htAdmin.service('requestService', function ($http, $cookies, tokenControlService) {

	this.apiGetToken = (username, password, callback) => {
		if(!callback) throw new Error("This function require callback");
		$http({
			method: 'POST',
			url: API.URL.token(),
			data: {
				grant_type: 'password',
				username,
				password,
				client_id: CLIENT_ID,
				client_secret: CLIENT_SECRET
			}
		}).then((response)=> {
			//save token to cookie
			tokenControlService.setToken(response.data.data);
			callback(null);
			return true;
		}, (error)=> {
			callback(error);
			return false;
		})
	};
	this.refreshToken = (successCb, failureCb) => {
		$http({
			method: 'POST',
			url: API.URL.token(),
			data: {
				grant_type: 'refresh_token',
				client_id: CLIENT_ID,
				client_secret: CLIENT_SECRET,
				refresh_token: tokenControlService.getTokenRefresh()
			}
		}).then((response)=> {
			if (successCb) successCb(null,response);
		}, (response)=> {
			if (failureCb) failureCb(response);
		})
	};

	this.apiRequest = (method = 'get', url, params, token, successCb, failureCb) => {
		$http({
			method: method,
			url: url,
			params: params,
			headers: {'Authorization': tokenControlService.getAuthorizationToken()}
		}).then((response)=> {
			if (successCb) successCb(null,response);
		}, (response)=> {
			if (failureCb) failureCb(response);
		})
	}
});
