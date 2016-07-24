htAdmin.service('requestService', function ($http, $cookies, tokenControlService) {

	this.apiGetToken = (username, password, callback) => {
		if (!callback) throw new Error("This function require callback");
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
			callback(null,response.data.data);
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
			if (successCb) successCb(null, response);
		}, (response)=> {
			if (failureCb) failureCb(response);
		})
	};

	this.apiRequest = (method = 'get', url, params, successCb, failureCb) => {
		$http({
			method: method,
			url: url,
			params: params,
			headers: {'Authorization': tokenControlService.getAuthorizationToken()}
		}).then((response)=> {
			console.log(response);
			if (successCb) successCb(null, response);
		}, (response)=> {
			console.log(response);
			if (failureCb) failureCb(response);
		})
	};

	this.getUserInfo = (successCb, failureCb)=> {
		// this.apiRequest('get',API.URL.user_info(),null,successCb,failureCb);
		$.ajax({
			type : 'get',
			url : 'http://localhost:8001/api.php?header=' + tokenControlService.getAuthorizationToken(),
			dataType: 'json',
			success: function(resp) {
				successCb(null,resp);
			}
		})
	}
});
